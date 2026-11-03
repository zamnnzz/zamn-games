(() => {
  const CURRENT_VERSION = "20260808-1705";
  const STORAGE_KEY = "zamn_site_version";
  const RELOAD_KEY = "zamn_version_reload_guard";

  async function checkForUpdate() {
    try {
      const res = await fetch("/version.json?t=" + Date.now(), {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });

      if (!res.ok) return;

      const data = await res.json();
      const latest = String(data.version || "").trim();
      if (!latest) return;

      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        localStorage.setItem(STORAGE_KEY, latest);
        return;
      }

      if (saved !== latest) {
        localStorage.setItem(STORAGE_KEY, latest);

        if (sessionStorage.getItem(RELOAD_KEY) !== latest) {
          sessionStorage.setItem(RELOAD_KEY, latest);

          const url = new URL(location.href);
          url.searchParams.set("v", latest);
          location.replace(url.toString());
        }
      }
    } catch (_) {}
  }

  window.addEventListener("pageshow", checkForUpdate);
  window.addEventListener("focus", checkForUpdate);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForUpdate();
  });

  // فحص دوري خفيف كل دقيقتين أثناء بقاء الصفحة مفتوحة.
  setInterval(checkForUpdate, 120000);

  // خزّن إصدار هذه النسخة عند أول تشغيل.
  try {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    }
  } catch (_) {}

  checkForUpdate();
})();
