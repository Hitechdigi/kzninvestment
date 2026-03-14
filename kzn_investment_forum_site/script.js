const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function startSlider() {
  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);
  }
}

function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.slide);
    showSlide(index);
    resetSlider();
  });
});

if (slides.length) {
  startSlider();
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const speakerData = {
  patrick: {
    role: "Keynote Speaker",
    name: "Patrick Dlamini",
    company: "CEO, Public Investment Corporation",
    body:
      "Patrick Dlamini is featured as one of the forum’s major investment voices, bringing insight into institutional capital, pension fund participation and strategic long-term investment in growth sectors.",
    visual: "PD",
    image: "assets/speakers/Patric-Dlamini.jpg",
    background: "linear-gradient(135deg, #355c7d, #1f3b60)"
  },
  ntuli: {
    role: "Government Leadership",
    name: "Thamisanqa Ntuli",
    company: "Premier of KwaZulu-Natal",
    body:
      "As Premier of KwaZulu-Natal, Thamisanqa Ntuli represents the province’s leadership vision for economic growth, investment mobilisation and stronger alignment between public priorities and private capital.",
    visual: "TN",
    image: "assets/speakers/thamisanqa-ntuli.jpg",
    background: "linear-gradient(135deg, #0b6a68, #0d2f47)"
  },
  lynette: {
    role: "Business & Investment Speaker",
    name: "Lynette Ntuli",
    company: "CEO, Innate Investment Solutions",
    body:
      "Lynette Ntuli brings experience in investment strategy, business development and high-impact commercial thinking, contributing to the forum’s focus on practical, investment-ready opportunities.",
    visual: "LN",
    image: "assets/speakers/lynette-ntuli.jpg",
    background: "linear-gradient(135deg, #8e6421, #243a50)"
  },
  pearl: {
    role: "Development Finance Speaker",
    name: "Pearl Bhengu",
    company: "CEO, Ithala Development Finance Corporation",
    body:
      "Pearl Bhengu contributes a development finance perspective focused on entrepreneurship, provincial growth support and pathways for funding the next generation of innovators and enterprises.",
    visual: "PB",
    image: "assets/speakers/pearl-bhengu.jpg",
    background: "linear-gradient(135deg, #7a2323, #1f3346)"
  },
  tshidi: {
    role: "Growth Fund Speaker",
    name: "Tshidi Ikaneng",
    company: "CEO, KZN Growth Fund",
    body:
      "Tshidi Ikaneng is positioned within the forum’s investment pipeline conversation, highlighting bankable opportunities and financing readiness across strategic sectors in KwaZulu-Natal.",
    visual: "TI",
    image: "assets/speakers/tshidi-ikaneng.jpg",
    background: "linear-gradient(135deg, #008ca2, #1c2744)"
  },
  kennedy: {
    role: "Financial Sector Speaker",
    name: "Kennedy Bhungane",
    company: "CEO, African Bank",
    body:
      "Kennedy Bhungane brings senior banking and capital markets leadership to the programme, supporting dialogue around funding structures, investor participation and sustainable economic growth.",
    visual: "KB",
    image: "assets/speakers/kennedy-bhungane.jpg",
    background: "linear-gradient(135deg, #5e2d7e, #1f3448)"
  }
};

const speakerCards = document.querySelectorAll(".speaker-card");
const modal = document.getElementById("speakerModal");
const modalRole = document.getElementById("modalRole");
const modalName = document.getElementById("modalName");
const modalCompany = document.getElementById("modalCompany");
const modalBody = document.getElementById("modalBody");
const modalVisual = document.getElementById("modalVisual");

function openSpeakerModal(key) {
  const speaker = speakerData[key];
  if (!speaker || !modal) return;

  modalRole.textContent = speaker.role;
  modalName.textContent = speaker.name;
  modalCompany.textContent = speaker.company;
  modalBody.textContent = speaker.body;

  if (speaker.image) {
    modalVisual.innerHTML = `<img src="${speaker.image}" alt="${speaker.name}" class="modal-speaker-img">`;
    modalVisual.style.background = "#0f172a";
  } else {
    modalVisual.innerHTML = `<div class="modal-speaker-fallback">${speaker.visual || ""}</div>`;
    modalVisual.style.background = speaker.background || "#0f172a";
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSpeakerModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

speakerCards.forEach((card) => {
  card.addEventListener("click", () => {
    openSpeakerModal(card.dataset.speaker);
  });
});

document.querySelectorAll('[data-close="modal"]').forEach((el) => {
  el.addEventListener("click", closeSpeakerModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSpeakerModal();
});

const targetDate = new Date("2026-07-30T09:00:00");

function updateCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

if (document.getElementById("days")) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
/* ===== SUCCESS MODAL ===== */
(function () {
  const registrationForm = document.querySelector(".registration-form");
  const successModal = document.getElementById("successModal");
  const successModalClose = document.getElementById("successModalClose");
  const successModalBtn = document.getElementById("successModalBtn");
  const successModalBackdrop = document.getElementById("successModalBackdrop");

  function openSuccessModal() {
    if (!successModal) return;
    successModal.classList.add("is-open");
    successModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove("is-open");
    successModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      openSuccessModal();
      registrationForm.reset();
    });
  }

  if (successModalClose) {
    successModalClose.addEventListener("click", closeSuccessModal);
  }

  if (successModalBtn) {
    successModalBtn.addEventListener("click", closeSuccessModal);
  }

  if (successModalBackdrop) {
    successModalBackdrop.addEventListener("click", closeSuccessModal);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && successModal && successModal.classList.contains("is-open")) {
      closeSuccessModal();
    }
  });
})();