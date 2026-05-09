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
        initServicesReadyState();
        initServicesHeroMotion();
        initServicesCtaMotion();
        initInteractiveServiceBlocks();
    });

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function initServicesReadyState() {
        document.body.classList.add("is-services-page", "is-services-ready");
    }

    

    function initServicesHeroMotion() {
        const hero = document.querySelector(".services-hero");
        const heroImage = document.querySelector(".services-hero .hero-bg img");
        const roofline = document.querySelector(".services-hero .hero-roofline-mark");

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

    

    function initServicesCtaMotion() {
        const cta = document.querySelector(".services-cta");
        const ctaImage = document.querySelector(".services-cta-bg img");
        const note = document.querySelector(".services-cta-note");

        if (!cta || prefersReducedMotion()) return;

        let frame = null;

        const update = (event) => {
            if (window.innerWidth < 1024) return;

            if (frame) {
                window.cancelAnimationFrame(frame);
            }

            frame = window.requestAnimationFrame(() => {
                const rect = cta.getBoundingClientRect();

                if (!rect.width || !rect.height) return;

                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                if (ctaImage) {
                    ctaImage.style.transform = `scale(1.04) translate(${x * -8}px, ${y * -5}px)`;
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
                if (ctaImage) {
                    ctaImage.style.transform = "";
                }

                if (note) {
                    note.style.transform = "";
                }
            });
        };

        cta.addEventListener("pointermove", update);
        cta.addEventListener("pointerleave", reset);
    }

    

    function initInteractiveServiceBlocks() {
        const blocks = document.querySelectorAll(
            ".service-structured-card, .services-process-step, .services-checklist-item, .services-cta-note"
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