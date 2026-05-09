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
        initAboutReadyState();
        initAboutHeroMotion();
        initAboutCtaMotion();
        initAboutInteractiveBlocks();
        initAboutMediaMotion();
    });

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function initAboutReadyState() {
        document.body.classList.add("is-about-page", "is-about-ready");
    }

    

    function initAboutHeroMotion() {
        const hero = document.querySelector(".about-hero");
        const heroImage = document.querySelector(".about-hero .hero-bg img");
        const roofline = document.querySelector(".about-hero .hero-roofline-mark");

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

    

    function initAboutCtaMotion() {
        const cta = document.querySelector(".about-cta");
        const ctaImage = document.querySelector(".about-cta-bg img");
        const note = document.querySelector(".about-cta-note");

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

    

    function initAboutMediaMotion() {
        const media = document.querySelector(".about-story-media");
        const image = document.querySelector(".about-story-media img");

        if (!media || !image || prefersReducedMotion()) return;

        media.addEventListener("pointerenter", () => {
            image.style.transform = "scale(1.055)";
        });

        media.addEventListener("pointerleave", () => {
            image.style.transform = "";
        });
    }

    

    function initAboutInteractiveBlocks() {
        const blocks = document.querySelectorAll(
            ".about-story-point, .about-model-panel, .about-clarity-item, .about-cta-note"
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