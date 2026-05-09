"use strict";



(function () {
    const onReady = (callback) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    };

    onReady(() => {
        initContactReadyState();
        initContactForm();
        initContactHeroMotion();
        initContactBottomMotion();
        initContactInteractiveBlocks();
        initContactMapMotion();
    });

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function initContactReadyState() {
        document.body.classList.add("is-contact-page", "is-contact-ready");
    }

    

    function initContactForm() {
        const form = document.querySelector("[data-contact-form]");
        const message = document.querySelector("[data-form-message]");

        if (!form || !message) return;

        const requiredFields = Array.from(form.querySelectorAll("[required]"));

        const showMessage = (text, type) => {
            message.textContent = text;
            message.classList.add("is-visible");
            message.classList.toggle("is-error", type === "error");
        };

        const clearFieldState = (field) => {
            field.removeAttribute("aria-invalid");
        };

        const markFieldInvalid = (field) => {
            field.setAttribute("aria-invalid", "true");
        };

        requiredFields.forEach((field) => {
            field.addEventListener("input", () => {
                clearFieldState(field);

                if (message.classList.contains("is-visible")) {
                    message.classList.remove("is-visible", "is-error");
                    message.textContent = "";
                }
            });

            field.addEventListener("change", () => {
                clearFieldState(field);

                if (message.classList.contains("is-visible")) {
                    message.classList.remove("is-visible", "is-error");
                    message.textContent = "";
                }
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let firstInvalidField = null;

            requiredFields.forEach((field) => {
                const isCheckbox = field.type === "checkbox";
                const isValid = isCheckbox ? field.checked : field.value.trim().length > 0;

                if (!isValid) {
                    markFieldInvalid(field);

                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    clearFieldState(field);
                }
            });

            const emailField = form.querySelector('input[type="email"]');

            if (emailField && emailField.value.trim() && !emailField.checkValidity()) {
                markFieldInvalid(emailField);

                if (!firstInvalidField) {
                    firstInvalidField = emailField;
                }
            }

            if (firstInvalidField) {
                showMessage("Please complete the required fields before submitting.", "error");
                firstInvalidField.focus();
                return;
            }

            showMessage("Your request details were prepared successfully.", "success");

            form.reset();

            requiredFields.forEach((field) => {
                clearFieldState(field);
            });
        });
    }

    

    function initContactHeroMotion() {
        const hero = document.querySelector(".contact-hero");
        const heroImage = document.querySelector(".contact-hero .hero-bg img");
        const roofline = document.querySelector(".contact-hero .hero-roofline-mark");

        if (!hero || prefersReducedMotion()) return;

        let frame = null;

        const update = (event) => {
            if (window.innerWidth < 1024) return;

            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();

                if (!rect.width || !rect.height) return;

                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (heroImage) {
                    heroImage.style.transform = `scale(1.045) translate(${x * -10}px, ${y * -7}px)`;
                }

                if (roofline) {
                    roofline.style.transform = `translate(${x * 10}px, ${y * 7}px)`;
                }
            });
        };

        const reset = () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                if (heroImage) {
                    heroImage.style.transform = "";
                }

                if (roofline) {
                    roofline.style.transform = "";
                }
            });
        };

        hero.addEventListener("pointermove", update);
        hero.addEventListener("pointerleave", reset);
    }

    

    function initContactBottomMotion() {
        const section = document.querySelector(".contact-bottom");
        const image = document.querySelector(".contact-bottom-bg img");
        const note = document.querySelector(".contact-bottom-note");

        if (!section || prefersReducedMotion()) return;

        let frame = null;

        const update = (event) => {
            if (window.innerWidth < 1024) return;

            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect();

                if (!rect.width || !rect.height) return;

                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (image) {
                    image.style.transform = `scale(1.04) translate(${x * -8}px, ${y * -5}px)`;
                }

                if (note) {
                    note.style.transform = `translate(${x * -4}px, ${y * -3}px)`;
                }
            });
        };

        const reset = () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                if (image) {
                    image.style.transform = "";
                }

                if (note) {
                    note.style.transform = "";
                }
            });
        };

        section.addEventListener("pointermove", update);
        section.addEventListener("pointerleave", reset);
    }

    

    function initContactMapMotion() {
        const mapCard = document.querySelector(".contact-map-card");
        const marker = document.querySelector(".contact-map-marker");
        const content = document.querySelector(".contact-map-content");

        if (!mapCard || prefersReducedMotion()) return;

        let frame = null;

        const update = (event) => {
            if (window.innerWidth < 1024) return;

            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                const rect = mapCard.getBoundingClientRect();

                if (!rect.width || !rect.height) return;

                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (marker) {
                    marker.style.transform = `translate(calc(-50% + ${x * 10}px), calc(-50% + ${y * 8}px))`;
                }

                if (content) {
                    content.style.transform = `translate(${x * -4}px, ${y * -3}px)`;
                }
            });
        };

        const reset = () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                if (marker) {
                    marker.style.transform = "";
                }

                if (content) {
                    content.style.transform = "";
                }
            });
        };

        mapCard.addEventListener("pointermove", update);
        mapCard.addEventListener("pointerleave", reset);
    }

    

    function initContactInteractiveBlocks() {
        const blocks = document.querySelectorAll(
            ".contact-info-item, .contact-map-card, .contact-bottom-note, .contact-legal-note"
        );

        if (!blocks.length) return;

        blocks.forEach((block, index) => {
            block.style.setProperty("--item-index", String(index + 1));

            block.addEventListener("pointerenter", () => {
                block.classList.add("is-hovered");
            });

            block.addEventListener("pointerleave", () => {
                block.classList.remove("is-hovered");
            });
        });
    }
})();