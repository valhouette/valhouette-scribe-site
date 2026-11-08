(function () {
  const STORAGE_KEY = "valhouette-scribe-cookie-consent";
  const SCRIPT_ID = "vs-gtag-script";

  const readConsent = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const setDefaultConsent = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
  };

  const initAnalytics = () => {
    if (document.getElementById(SCRIPT_ID)) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-1P17PNME6H";
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", "G-1P17PNME6H", {
      anonymize_ip: true,
      send_page_view: true,
    });
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
    });
  };

  const applyConsent = (choice) => {
    if (choice === "accepted") {
      setDefaultConsent();
      initAnalytics();
      return;
    }

    setDefaultConsent();
  };

  window.addEventListener("vs:consent", (event) => {
    applyConsent(event.detail);
  });

  const consent = readConsent();
  if (consent === "accepted") {
    applyConsent("accepted");
    return;
  }

  applyConsent("declined");
})();