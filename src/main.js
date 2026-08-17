import "./styles.css";

/* ═══════════════════════════════════════════════════════════════
   SHIFT Solutions — Main JS
   
   Modules:
   1. Mobile menu (ARIA toggle, Escape close, focus management)
   2. Scroll fade-in (IntersectionObserver, reduced-motion aware)
   3. Contact form (blur validation, aria-invalid, webhook POST)
   4. Success modal (focus trap, Escape close, focus restore)
   ═══════════════════════════════════════════════════════════════ */

const WEBHOOK_URL = "https://your-webhook-url.com/api/contact";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* ═══════════════════════════════════════
   1. MOBILE MENU
   ═══════════════════════════════════════ */
function initMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    // Focus first link
    const firstLink = menu.querySelector("a");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    toggle.focus();
  }

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  toggle.addEventListener("click", () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      closeMenu();
    }
  });

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });
}


/* ═══════════════════════════════════════
   2. SCROLL FADE-IN
   Disabled entirely when prefers-reduced-motion
   ═══════════════════════════════════════ */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-up");

  if (prefersReducedMotion) {
    // Show everything immediately
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}


/* ═══════════════════════════════════════
   3. CONTACT FORM
   Blur validation with aria-invalid and
   aria-describedby error messages.
   ═══════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("form-submit");
  const submitText = document.getElementById("submit-text");
  const submitSpinner = document.getElementById("submit-spinner");

  // Field validation rules
  const fields = [
    {
      id: "form-name",
      errorId: "form-name-error",
      validate: (v) => v.trim().length > 0,
    },
    {
      id: "form-email",
      errorId: "form-email-error",
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    },
    {
      id: "form-phone",
      errorId: "form-phone-error",
      // Optional but if filled, must match pattern
      validate: (v) => v.trim() === "" || /^\+?[0-9\s]{9,15}$/.test(v.trim()),
    },
    {
      id: "form-topic",
      errorId: "form-topic-error",
      validate: (v) => v.trim().length > 0,
    },
    {
      id: "form-desc",
      errorId: "form-desc-error",
      validate: (v) => v.trim().length > 0,
    },
  ];

  // Set error state on a field
  function setFieldError(field, hasError) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);
    if (!input || !error) return;

    if (hasError) {
      input.setAttribute("aria-invalid", "true");
      error.removeAttribute("hidden");
    } else {
      input.removeAttribute("aria-invalid");
      error.setAttribute("hidden", "");
    }
  }

  // Validate a single field
  function validateField(field) {
    const input = document.getElementById(field.id);
    if (!input) return true;
    const isValid = field.validate(input.value);
    setFieldError(field, !isValid);
    return isValid;
  }

  // Attach blur validation
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input) return;

    input.addEventListener("blur", () => validateField(field));

    // Clear error on input (after first error shown)
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    let firstInvalid = null;

    fields.forEach((field) => {
      const isValid = validateField(field);
      if (!isValid && allValid) {
        allValid = false;
        firstInvalid = document.getElementById(field.id);
      }
    });

    if (!allValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Loading state
    submitText.textContent = "A enviar...";
    submitSpinner.classList.add("active");
    submitBtn.disabled = true;

    const payload = {
      name: document.getElementById("form-name").value.trim(),
      email: document.getElementById("form-email").value.trim(),
      phone: document.getElementById("form-phone").value.trim(),
      topic: document.getElementById("form-topic").value,
      description: document.getElementById("form-desc").value.trim(),
      timestamp: new Date().toISOString(),
      source: "shiftai.pt",
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
    } catch (err) {
      console.log("Form submitted (no-cors):", payload);
    }

    // Reset
    form.reset();
    fields.forEach((field) => setFieldError(field, false));
    submitText.textContent = "Enviar Mensagem";
    submitSpinner.classList.remove("active");
    submitBtn.disabled = false;

    // Show modal
    openModal();
  });
}


/* ═══════════════════════════════════════
   4. SUCCESS MODAL
   Focus trap, Escape to close, restore focus.
   ═══════════════════════════════════════ */
let modalTrigger = null;

function openModal() {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  modalTrigger = document.activeElement;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  // Focus the close button
  const closeBtn = document.getElementById("modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  // Restore focus to trigger
  if (modalTrigger && modalTrigger.focus) {
    modalTrigger.focus();
  }
  modalTrigger = null;
}

function initModal() {
  const modal = document.getElementById("success-modal");
  const closeBtn = document.getElementById("modal-close");
  if (!modal) return;

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Focus trap
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;

    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}


/* ═══════════════════════════════════════
   INIT
   ═══════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollAnimations();
  initContactForm();
  initModal();
});
