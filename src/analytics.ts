import type { TrackEventName } from "./types";

export type TrackPayload = Record<string, string | number | boolean>;

type PlausibleWindow = Window & {
  readonly plausible?: (
    name: string,
    options?: { readonly props: TrackPayload },
  ) => void;
};

type GtagWindow = Window & {
  readonly gtag?: (
    command: "event",
    name: string,
    params?: TrackPayload,
  ) => void;
};

export function trackEvent(
  name: TrackEventName,
  payload: TrackPayload = {},
): void {
  const plausibleTarget: PlausibleWindow = window;
  const gtagTarget: GtagWindow = window;

  if (typeof plausibleTarget.plausible === "function") {
    plausibleTarget.plausible(name, { props: payload });
    return;
  }

  if (typeof gtagTarget.gtag === "function") {
    gtagTarget.gtag("event", name, payload);
    return;
  }

  console.info("[trackEvent]", name, payload);
}
