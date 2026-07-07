export class MissingElementError extends Error {
  public constructor(selector: string) {
    super(`Missing element: ${selector}`);
    this.name = "MissingElementError";
  }
}

export function mustElement<T extends Element>(
  root: ParentNode,
  selector: string,
  elementClass: { new (): T },
): T {
  const element = root.querySelector(selector);

  if (!(element instanceof elementClass)) {
    throw new MissingElementError(selector);
  }

  return element;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected state: ${JSON.stringify(value)}`);
}
