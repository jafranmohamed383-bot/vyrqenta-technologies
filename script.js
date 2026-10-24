/* Vyrqenta Technologies - Website Interactions */

document.addEventListener("DOMContentLoaded", () => {
    // Automatically update the copyright year
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Reveal sections as they enter the viewport
    const revealElements = document.querySelectorAll(
        ".service-card, .about, .contact, .section-heading"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }
});

/* Contact enquiry email */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();
        const status = document.getElementById("formStatus");

        // Replace this placeholder with your real business email.
        const businessEmail = "vyrqentatechnologies@gmail.com";

        if (businessEmail === "YOUR_EMAIL@gmail.com") {
            status.textContent =
                "Setup pending: replace YOUR_EMAIL@gmail.com in script.js with your real business email.";
            return;
        }

        const subject = encodeURIComponent(
            "New project enquiry - " + service
        );

        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Service: " + service + "\n\n" +
            "Project details:\n" + message
        );

        status.textContent =
            "Opening your email app to prepare the enquiry...";

        window.location.href =
            "mailto:" + businessEmail +
            "?subject=" + subject +
            "&body=" + body;
    });
}