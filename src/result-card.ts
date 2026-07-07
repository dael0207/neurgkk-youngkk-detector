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
  const pageColor = "#fafaf2";
  const frameColor = "#f4f4ec";
  const textColor = "#25292d";
  const mutedColor = "#4c536a";
  const neonColor = "#dfff24";
  const surfaceColor = "#e1e5d5";
  const accentColor =
    result.profile.accent === "#111111" ? neonColor : result.profile.accent;

  context.fillStyle = frameColor;
  context.fillRect(0, 0, cardWidth, cardHeight);

  fillRoundedRect(context, 72, 72, 936, 1776, 42, pageColor);
  fillRoundedRect(context, 120, 136, 520, 108, 54, neonColor);
  fillRoundedRect(context, 120, 258, 248, 18, 9, accentColor);
  fillRoundedRect(context, 680, 136, 280, 108, 54, "#ffffff");

  drawText(context, "늙크크 영크크 판독기", 150, 206, 44, textColor, "900");
  drawText(
    context,
    `${result.score}/${result.maxScore}`,
    718,
    210,
    48,
    textColor,
    "900",
  );
  drawFittedText(
    context,
    result.profile.title,
    120,
    498,
    820,
    148,
    86,
    textColor,
    "900",
  );
  fillRoundedRect(context, 120, 590, 420, 92, 46, neonColor);
  drawFittedText(
    context,
    result.profile.badge,
    150,
    650,
    360,
    46,
    34,
    textColor,
    "900",
  );
  wrapText(
    context,
    result.profile.comparison,
    126,
    810,
    76,
    820,
    62,
    textColor,
  );
  wrapText(
    context,
    result.profile.description,
    126,
    1000,
    64,
    820,
    48,
    mutedColor,
  );
  wrapText(context, result.profile.taunt, 126, 1328, 68, 820, 54, textColor);
  fillRoundedRect(context, 120, 1560, 820, 178, 44, surfaceColor);
  drawText(
    context,
    "친구 결과가 더 궁금하면",
    154,
    1636,
    42,
    mutedColor,
    "800",
  );
  drawFittedText(
    context,
    window.location.host,
    154,
    1698,
    752,
    54,
    38,
    textColor,
    "900",
  );
}

function fillRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
): void {
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height,
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.fill();
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

function drawFittedText(
  context: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  maxWidth: number,
  maxSize: number,
  minSize: number,
  color: string,
  weight: string,
): void {
  let size = maxSize;
  context.fillStyle = color;
  context.font = `${weight} ${size}px Arial, sans-serif`;

  while (context.measureText(value).width > maxWidth && size > minSize) {
    size -= 2;
    context.font = `${weight} ${size}px Arial, sans-serif`;
  }

  context.fillText(value, x, y);
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png", 0.94);
  });
}
