import { trackEvent } from "./analytics";
import type { QuizResult } from "./types";

export type SaveResult = "saved" | "opened" | "failed";

const cardWidth = 1080;
const cardHeight = 1920;

export async function saveResultCard(result: QuizResult): Promise<SaveResult> {
  const canvas = document.createElement("canvas");
  canvas.width = cardWidth;
  canvas.height = cardHeight;
  const context = canvas.getContext("2d");

  if (context === null) {
    return "failed";
  }

  drawCard(context, result);
  const blob = await canvasToBlob(canvas);

  if (blob === null) {
    return "failed";
  }

  const objectUrl = URL.createObjectURL(blob);

  if (!supportsDownload()) {
    const opened = window.open(objectUrl, "_blank", "noopener,noreferrer");

    if (opened === null) {
      URL.revokeObjectURL(objectUrl);
      return "failed";
    }

    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
    trackEvent("save_image_click", {
      grade: result.profile.grade,
      score: result.score,
      method: "open-tab",
    });
    return "opened";
  }

  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = `neurgkk-${result.profile.grade}-${result.score}.png`;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
  trackEvent("save_image_click", {
    grade: result.profile.grade,
    score: result.score,
  });
  return "saved";
}

function supportsDownload(): boolean {
  return "download" in HTMLAnchorElement.prototype;
}

function drawCard(context: CanvasRenderingContext2D, result: QuizResult): void {
  context.fillStyle = "#f7f1df";
  context.fillRect(0, 0, cardWidth, cardHeight);
  context.fillStyle = "#111111";
  context.fillRect(72, 72, 936, 1776);
  context.fillStyle = result.profile.accent;
  context.fillRect(120, 136, 520, 108);
  context.fillStyle = "#ffffff";
  context.fillRect(680, 136, 280, 108);

  drawText(context, "늙크크 영크크 판독기", 144, 210, 44, "#111111", "900");
  drawText(
    context,
    `${result.score}/${result.maxScore}`,
    718,
    210,
    48,
    "#111111",
    "900",
  );
  drawText(context, result.profile.title, 120, 500, 142, "#ffffff", "900");
  drawText(context, result.profile.badge, 126, 640, 52, "#fbff35", "900");
  drawText(
    context,
    result.profile.comparison,
    126,
    805,
    58,
    result.profile.accent,
    "900",
  );
  wrapText(
    context,
    result.profile.description,
    126,
    980,
    64,
    820,
    48,
    "#ffffff",
  );
  wrapText(context, result.profile.taunt, 126, 1320, 68, 820, 54, "#fbff35");
  drawText(context, "친구 결과가 더 궁금하면", 126, 1640, 44, "#ffffff", "700");
  drawText(context, "neurgkk.netlify.app", 126, 1710, 54, "#ffffff", "900");
}

function drawText(
  context: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  size: number,
  color: string,
  weight: string,
): void {
  context.fillStyle = color;
  context.font = `${weight} ${size}px Arial, sans-serif`;
  context.fillText(value, x, y);
}

function wrapText(
  context: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  lineHeight: number,
  maxWidth: number,
  size: number,
  color: string,
): void {
  context.fillStyle = color;
  context.font = `800 ${size}px Arial, sans-serif`;
  const words = value.split(" ");
  let line = "";
  let nextY = y;

  for (const word of words) {
    const testLine = line.length === 0 ? word : `${line} ${word}`;
    const metrics = context.measureText(testLine);

    if (metrics.width > maxWidth && line.length > 0) {
      context.fillText(line, x, nextY);
      line = word;
      nextY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line.length > 0) {
    context.fillText(line, x, nextY);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png", 0.94);
  });
}
