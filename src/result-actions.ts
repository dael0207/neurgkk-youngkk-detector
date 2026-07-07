import { trackEvent } from "./analytics";
import { mustElement } from "./dom";
import { saveResultCard } from "./result-card";
import {
  copyLink,
  createSharePayload,
  shareViaKakao,
  shareViaSystem,
} from "./share";
import type { QuizResult } from "./types";

export function bindResultEvents(
  root: ParentNode,
  result: QuizResult,
  onRetry: () => void,
): void {
  const payload = createSharePayload(result);
  const toast = mustElement(root, "#toast", HTMLElement);
  mustElement(root, "[data-action='save']", HTMLButtonElement).addEventListener(
    "click",
    () => {
      void saveResultCard(result).then((status) => {
        if (status === "saved") {
          toast.textContent = "결과 이미지를 저장했어요.";
          return;
        }
        toast.textContent =
          status === "opened"
            ? "새 탭에서 이미지를 길게 눌러 저장하세요."
            : "이 브라우저에서는 저장을 지원하지 않아요.";
      });
    },
  );
  mustElement(
    root,
    "[data-action='system-share']",
    HTMLButtonElement,
  ).addEventListener("click", () => {
    void shareViaSystem(payload).then((result) => {
      const messages: Record<typeof result, string> = {
        shared: "공유창을 열었어요.",
        copied: "공유 미지원이라 링크를 복사했어요.",
        manual: "공유/복사가 막혔어요. 주소창 링크를 직접 복사해주세요.",
        cancelled: "공유를 취소했어요. 링크 복사도 사용할 수 있어요.",
      };
      toast.textContent = messages[result];
    });
  });
  mustElement(root, "[data-action='copy']", HTMLButtonElement).addEventListener(
    "click",
    () => {
      void copyLink(payload).then((result) => {
        toast.textContent =
          result === "copied"
            ? "링크를 복사했어요."
            : "자동 복사가 막혔어요. 주소창 링크를 직접 복사해주세요.";
      });
    },
  );
  mustElement(
    root,
    "[data-action='kakao']",
    HTMLButtonElement,
  ).addEventListener("click", () => {
    const result = shareViaKakao(payload);
    const messages: Record<typeof result, string> = {
      sent: "카카오톡 공유창을 열었어요.",
      unavailable: "Kakao JavaScript 키와 도메인 등록 후 활성화됩니다.",
      failed: "Kakao 설정을 확인해주세요. 지금은 링크 복사를 사용하세요.",
    };
    toast.textContent = messages[result];
  });
  mustElement(
    root,
    "[data-action='retry']",
    HTMLButtonElement,
  ).addEventListener("click", () => {
    trackEvent("retry_click");
    onRetry();
  });
}
