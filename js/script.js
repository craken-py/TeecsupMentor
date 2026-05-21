// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

function toggleMenu() {
  mobileToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  navOverlay.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
}

mobileToggle.addEventListener("click", toggleMenu);
navOverlay.addEventListener("click", toggleMenu);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) toggleMenu();
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".animate-on-scroll")
  .forEach((el) => observer.observe(el));

// ===== PROGRESS BAR ANIMATION =====
const progressFill = document.getElementById("progressFill");
setTimeout(() => {
  progressFill.style.width = "78%";
}, 1000);

// ===== FAQ TOGGLE =====
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector(".faq-answer");
  const isActive = faqItem.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
    item.querySelector(".faq-answer").style.maxHeight = "0";
  });

  if (!isActive) {
    faqItem.classList.add("active");
    answer.style.maxHeight = answer.scrollHeight + "px";
  }
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const stats = document.querySelectorAll(".stat h3 span");
  stats.forEach((stat) => {
    const text = stat.textContent;
    const hasPlus = text.includes("+");
    const hasPercent = text.includes("%");
    const hasK = text.includes("K");
    let target = parseFloat(text.replace(/[^0-9.]/g, ""));
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      let display = current;
      if (hasK) display = Math.floor(current) + "K";
      else if (hasPercent) display = Math.floor(current) + "%";
      else display = Math.floor(current).toLocaleString();
      if (hasPlus) display += "+";
      stat.textContent = display;
    }, 30);
  });
}

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) heroObserver.observe(heroStats);
