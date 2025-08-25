import './styles/main.scss';

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("open-sidebar");
  const closeBtn = document.getElementById("close-sidebar");
  const overlay = document.querySelector(".overlay");

  // Проверяем, что все элементы найдены
  if (!openBtn || !closeBtn || !overlay) {
    console.error("❌ Не все элементы найдены:", { openBtn, closeBtn, overlay });
    return;
  }

  // === Бургер-меню: открытие/закрытие с оверлеем ===
  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sidebar.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sidebar.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  });

  // Закрытие бургер-меню по клику на оверлей
  overlay.addEventListener("click", function () {
    if (!sidebar.classList.contains("hidden")) {
      sidebar.classList.add("hidden");
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });

  // === Форма обратной связи (первая) ===
  const feedbackForm = document.querySelector(".feedback-form");
  const openButtons = document.querySelectorAll(".open-button-message");
  const closeButtons = document.querySelectorAll(".close-button-message");

  if (!feedbackForm) {
    console.error("❌ Форма .feedback-form не найдена");
  } else {
    openButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        feedbackForm.classList.add("open");
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    closeButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        feedbackForm.classList.remove("open");
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      });
    });
  }

  // === Вторая форма (если есть) ===
  const feedbackFormOne = document.querySelector(".feedback-form--one");
  const openBtnOne = document.querySelectorAll(".open-button-feedback");
  const closeBtnOne = document.querySelectorAll(".close-btn-feedback");

  if (feedbackFormOne) {
    openBtnOne.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        feedbackFormOne.classList.add("open");
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    closeBtnOne.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        feedbackFormOne.classList.remove("open");
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      });
    });
  }

  // === Закрытие форм по оверлею ===
  overlay.addEventListener("click", function () {
    // Если форма открыта — закрываем
    if (feedbackForm && feedbackForm.classList.contains("open")) {
      feedbackForm.classList.remove("open");
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    }

    if (feedbackFormOne && feedbackFormOne.classList.contains("open")) {
      feedbackFormOne.classList.remove("open");
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    }
  });

  // === Закрытие по клавише Escape ===
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Закрытие бургер-меню
      if (!sidebar.classList.contains("hidden")) {
        sidebar.classList.add("hidden");
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      }

      // Закрытие первой формы
      if (feedbackForm && feedbackForm.classList.contains("open")) {
        feedbackForm.classList.remove("open");
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      }

      // Закрытие второй формы
      if (feedbackFormOne && feedbackFormOne.classList.contains("open")) {
        feedbackFormOne.classList.remove("open");
        overlay.classList.add("hidden");
        document.body.style.overflow = "";
      }
    }
  });

  // === Кнопка "Читать далее" ===
  const skipBtn = document.querySelector(".button__skip");
  const textMobile = document.querySelector(".serv__text_mobile");
  const win = document.querySelector(".win");

  if (skipBtn) {
    skipBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const width = window.innerWidth;
      skipBtn.style.display = "none";

      if (width < 768) {
        if (textMobile) textMobile.style.display = "block";
        if (win) win.style.display = "block";
      } else if (width >= 768 && width < 1120) {
        if (win) win.style.display = "block";
      }
    });
  }

  // === Слайдеры (Swiper) ===
  let swiperBrands = null;
  let swiperRepair = null;
  let swiperPrice = null;

  function initSwipers() {
    if (swiperBrands) swiperBrands.destroy();
    if (swiperRepair) swiperRepair.destroy();
    if (swiperPrice) swiperPrice.destroy();

    const width = window.innerWidth;

    if (width < 768) {
      swiperBrands = new Swiper(".brands .swiper-container", {
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".brands .swiper-pagination", clickable: true },
        observer: true,
        observeParents: true,
      });

      swiperRepair = new Swiper(".repair .swiper-container", {
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".repair .swiper-pagination", clickable: true },
        observer: true,
        observeParents: true,
      });

      swiperPrice = new Swiper(".price .swiper-container", {
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: { el: ".price .swiper-pagination", clickable: true },
        observer: true,
        observeParents: true,
      });
    }
  }

  initSwipers();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initSwipers, 150);
  });

  // === Показать/Скрыть списки ===
  function toggleList(toggleSelector, listSelector, limit = 8) {
    const toggle = document.querySelector(toggleSelector);
    const list = document.querySelector(listSelector);
    if (!toggle || !list) return;

    toggle.addEventListener("click", () => {
      const isExpanded = list.classList.toggle("expanded");
      toggle.textContent = isExpanded ? "Скрыть" : "Показать все";

      list.querySelectorAll("li").forEach((item, index) => {
        if (index >= limit) {
          item.style.display = isExpanded ? "list-item" : "none";
        }
      });

      if (window.innerWidth < 768) {
        if (listSelector === ".brands_list" && swiperBrands) swiperBrands.update();
        if (listSelector === ".repair_list" && swiperRepair) swiperRepair.update();
        if (listSelector === ".price_list" && swiperPrice) swiperPrice.update();
      }
    });
  }

  toggleList(".brands_toggle", ".brands_list", 8);
  toggleList(".repair_toggle", ".repair_list", 4);
});