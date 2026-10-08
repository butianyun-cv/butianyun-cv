/* A 系列手册列表 - 折叠/展开交互 */
(function () {
    "use strict";

    function toggleCategory(category) {
        var isOpen = category.classList.toggle("is-open");
        var header = category.querySelector(".manual-category-header");
        var toggle = category.querySelector(".manual-category-toggle");
        if (header) {
            header.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
        if (toggle) {
            toggle.textContent = isOpen ? "▲ 收起" : "▼ 展开";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var categories = document.querySelectorAll(".manual-category");
        categories.forEach(function (category) {
            var header = category.querySelector(".manual-category-header");
            if (!header) return;

            header.addEventListener("click", function () {
                toggleCategory(category);
            });

            header.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCategory(category);
                }
            });
        });
    });
})();
