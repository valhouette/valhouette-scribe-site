(function () {
  const form = document.getElementById("blog-search-form");
  const input = document.getElementById("blog-search");
  const clearButton = document.getElementById("blog-search-clear");
  const items = document.querySelectorAll(".post-item");

  function filterPosts(value) {
    const q = value.toLowerCase().trim();
    items.forEach(function (item) {
      const title = item.querySelector(".post-title")
        ? item.querySelector(".post-title").textContent.toLowerCase()
        : "";
      const desc = item.querySelector(".post-desc")
        ? item.querySelector(".post-desc").textContent.toLowerCase()
        : "";
      item.style.display = !q || title.includes(q) || desc.includes(q) ? "" : "none";
    });
  }

  function updateClearButton() {
    if (!clearButton || !input) return;
    const hasValue = input.value.trim().length > 0;
    clearButton.classList.toggle("visible", hasValue);
  }

  if (input) {
    input.addEventListener("input", function () {
      filterPosts(this.value);
      updateClearButton();
    });
    updateClearButton();
  }

  if (clearButton && input) {
    clearButton.addEventListener("click", function () {
      input.value = "";
      updateClearButton();
      filterPosts("");
      input.focus();
    });
  }

  if (form && input) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      filterPosts(input.value);
      input.focus();
    });
  }
})();
