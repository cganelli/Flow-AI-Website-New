// Simple analytics hook: logs events in development, no-ops in production.
export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  // eslint-disable-next-line no-console
  console.debug("[analytics]", name, props ?? {});
}
