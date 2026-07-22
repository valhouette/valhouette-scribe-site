(function () {
  const form = document.getElementById("blog-search-form");
  const input = document.getElementById("blog-search");
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

  if (input) {
    input.addEventListener("input", function () {
      filterPosts(this.value);
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
