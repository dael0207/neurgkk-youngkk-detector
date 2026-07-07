import { beforeEach, describe, expect, it, vi } from "vitest";
import { copyLink, shareViaKakao, shareViaSystem } from "./share";
import type { SharePayload } from "./types";

const payload: SharePayload = {
  title: "나는 영크크 38점",
  text: "상위 12% 영크크 감지. 너도 밈 나이 판독해봐.",
  url: "https://example.com/result",
};

describe("share fallback behavior", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
    vi.spyOn(console, "info").mockImplementation(() => undefined);
    Object.defineProperty(window, "NEURGKK_KAKAO_KEY", {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(window, "Kakao", {
      value: undefined,
      configurable: true,
    });
  });

  it("Given no Web Share support When system share runs Then it falls back to link copy", async () => {
    Object.defineProperty(navigator, "share", {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(document, "execCommand", {
      value: () => true,
      configurable: true,
    });

    await expect(shareViaSystem(payload)).resolves.toBe("copied");
  });

  it("Given clipboard permission failure When copying Then selection fallback is used", async () => {
    const clipboard = {
      writeText: vi
        .fn<(value: string) => Promise<void>>()
        .mockRejectedValue(new DOMException("denied", "NotAllowedError")),
    };
    Object.defineProperty(navigator, "clipboard", {
      value: clipboard,
      configurable: true,
    });
    Object.defineProperty(document, "execCommand", {
      value: () => true,
      configurable: true,
    });

    await expect(copyLink(payload)).resolves.toBe("copied");
    expect(clipboard.writeText).toHaveBeenCalledWith(payload.url);
  });

  it("Given user cancels native share When sharing Then cancellation is not counted as copy", async () => {
    Object.defineProperty(navigator, "share", {
      value: vi
        .fn<() => Promise<void>>()
        .mockRejectedValue(new DOMException("cancelled", "AbortError")),
      configurable: true,
    });

    await expect(shareViaSystem(payload)).resolves.toBe("cancelled");
  });

  it("Given Kakao is unconfigured When sharing Then it reports unavailable", () => {
    expect(shareViaKakao(payload)).toBe("unavailable");
  });
});
