"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE MENU
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    // Escape key closes the mobile menu
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });

    // Close mobile menu when returning to desktop width
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // 2. AUTOMATIC FOOTER YEAR
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. FAQ ACCESSIBILITY
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const summary = item.querySelector("summary");

    if (summary) {
      summary.setAttribute("aria-expanded", String(item.open));

      item.addEventListener("toggle", function () {
        summary.setAttribute("aria-expanded", String(item.open));
      });
    }
  });

  // 4. CONTACT FORM
  const contactForm = document.getElementById("contactForm");

  // Change this to your real business email
  const contactEmail = "hello@vyrqenta.com";

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const name = contactForm.querySelector('[name="name"]')?.value.trim() || "";
      const email = contactForm.querySelector('[name="email"]')?.value.trim() || "";
      const service = contactForm.querySelector('[name="service"]')?.value.trim() || "";
      const message = contactForm.querySelector('[name="message"]')?.value.trim() || "";

      const subject = encodeURIComponent(
        "Project Enquiry - " + service
      );

      const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\nService: " + service +
        "\n\nProject Details:\n" + message
      );

      window.location.href =
        "mailto:" + contactEmail +
        "?subject=" + subject +
        "&body=" + body;
    });
  }

  // 5. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    });
  });

  // 6. HIDE BROKEN TECHNOLOGY LOGOS
  document.querySelectorAll(".tech-card img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
    });
  });

  console.log("Vyrqenta Technologies JavaScript loaded successfully.");

});