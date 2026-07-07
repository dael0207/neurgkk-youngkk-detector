import { trackEvent } from "./analytics";
import type { QuizResult, SharePayload } from "./types";

type KakaoShareOptions = {
  readonly objectType: "feed";
  readonly content: {
    readonly title: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly link: {
      readonly mobileWebUrl: string;
      readonly webUrl: string;
    };
  };
  readonly buttons: readonly [
    {
      readonly title: string;
      readonly link: {
        readonly mobileWebUrl: string;
        readonly webUrl: string;
      };
    },
  ];
};

type KakaoSdk = {
  readonly isInitialized: () => boolean;
  readonly init: (key: string) => void;
  readonly Share?: {
    readonly sendDefault: (options: KakaoShareOptions) => void;
  };
};

declare global {
  interface Window {
    readonly Kakao?: KakaoSdk;
    readonly NEURGKK_KAKAO_KEY?: string;
  }
}

export function createSharePayload(result: QuizResult): SharePayload {
  const title = `나는 ${result.profile.title} ${result.score}점`;
  const text = `${result.profile.comparison}. 너도 밈 나이 판독해봐.`;
  const url = window.location.href;

  return { title, text, url };
}

export type CopyResult = "copied" | "manual";
export type SystemShareResult = "shared" | "copied" | "manual" | "cancelled";
export type KakaoShareResult = "sent" | "unavailable" | "failed";

export async function shareViaSystem(
  payload: SharePayload,
): Promise<SystemShareResult> {
  if (typeof navigator.share !== "function") {
    return copyLink(payload);
  }

  try {
    await navigator.share(payload);
    trackEvent("share_web_click", { title: payload.title });
    return "shared";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled";
    }
    return copyLink(payload);
  }
}

export async function copyLink(payload: SharePayload): Promise<CopyResult> {
  if (navigator.clipboard !== undefined) {
    try {
      await navigator.clipboard.writeText(payload.url);
      trackEvent("copy_link_click", { url: payload.url, method: "clipboard" });
      return "copied";
    } catch (error) {
      if (error instanceof DOMException || error instanceof Error) {
        return copyWithSelection(payload.url);
      }
      throw error;
    }
  }

  return copyWithSelection(payload.url);
}

export function shareViaKakao(payload: SharePayload): KakaoShareResult {
  const kakao = window.Kakao;
  const key = window.NEURGKK_KAKAO_KEY;

  if (kakao === undefined || key === undefined || key.length === 0) {
    return "unavailable";
  }

  if (!kakao.isInitialized()) {
    kakao.init(key);
  }

  if (kakao.Share === undefined) {
    return "unavailable";
  }

  try {
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: payload.title,
        description: payload.text,
        imageUrl: new URL("/og-image.svg", window.location.origin).toString(),
        link: {
          mobileWebUrl: payload.url,
          webUrl: payload.url,
        },
      },
      buttons: [
        {
          title: "판독하기",
          link: {
            mobileWebUrl: payload.url,
            webUrl: payload.url,
          },
        },
      ],
    });
    trackEvent("share_kakao_click", { title: payload.title });
    return "sent";
  } catch (error) {
    if (error instanceof Error || error instanceof DOMException) {
      console.info("[shareViaKakao] unavailable", error.message);
      return "failed";
    }
    throw error;
  }
}

function copyWithSelection(url: string): CopyResult {
  const textarea = document.createElement("textarea");
  textarea.value = url;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (copied) {
    trackEvent("copy_link_click", { url, method: "selection" });
    return "copied";
  }

  return "manual";
}
