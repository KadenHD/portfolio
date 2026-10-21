function isLegacyAnalyticsKey(key) {
  return (
    (key.startsWith("ph_") &&
      (key.endsWith("_posthog") ||
        key.endsWith("_window_id") ||
        key.endsWith("_primary_window_exists"))) ||
    key.startsWith("__ph_opt_in_out_")
  );
}

export function clearLegacyAnalytics() {
  for (const storageName of ["localStorage", "sessionStorage"]) {
    try {
      const storage = window[storageName];
      for (const key of Object.keys(storage)) {
        if (isLegacyAnalyticsKey(key)) storage.removeItem(key);
      }
    } catch {
      // Storage can be disabled by the visitor's browser settings.
    }
  }

  try {
    const domains = window.location.hostname
      .split(".")
      .map((_, index, parts) => parts.slice(index).join("."))
      .filter((domain) => domain.includes("."));

    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (!isLegacyAnalyticsKey(name)) continue;
      const expired = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      document.cookie = expired;
      for (const domain of domains) {
        document.cookie = `${expired}; Domain=${domain}`;
      }
    }
  } catch {
    // Cookie access can also be disabled independently of browser storage.
  }
}
