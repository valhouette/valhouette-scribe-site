(function () {
  const STORAGE_KEY = "valhouette-scribe-cookie-consent";
  const banner = document.getElementById("cookie-consent");
  const buttons = document.querySelectorAll("[data-cookie-choice]");

  if (!banner || buttons.length === 0) {
    return;
  }

  const readConsent = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const writeConsent = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      // Ignore storage failures so the site still works without cookies.
    }
  };

  const displayChoice = (choice) => {
    if (choice === "accepted" || choice === "declined") {
      banner.hidden = true;
      return;
    }

    banner.hidden = false;
  };

  const handleConsent = (choice) => {
    const normalizedChoice = choice === "accepted" ? "accepted" : "declined";
    writeConsent(normalizedChoice);
    banner.hidden = true;
    window.dispatchEvent(
      new CustomEvent("vs:consent", {
        detail: normalizedChoice,
      })
    );
  };

  const storedChoice = readConsent();
  displayChoice(storedChoice);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      handleConsent(button.dataset.cookieChoice);
    });
  });
})();
