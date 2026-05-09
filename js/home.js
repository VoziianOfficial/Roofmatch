"use strict";

/* ==========================================================
   ROOFMATCH — HOME PAGE SCRIPT
   File: /js/home.js

   Purpose:
   - subtle dark-premium hero motion
   - full-background photo polish
   - CTA background motion
   - hover hooks for home sections
   - safe reduced-motion behavior
   ========================================================== */

(function () {
    const onReady = (callback) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    };

    onReady(() => {
        initHomeReadyState();
        initHeroBackgroundMotion();
        initCtaBackgroundMotion();
        initInteractiveRows();
        initPointerGlow();
    });

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function initHomeReadyState() {
        document.body.classList.add("is-home-page", "is-home-ready");
    }

    /* =========================
       HERO BACKGROUND MOTION
       ========================= */

    function initHeroBackgroundMotion() {
        const hero = document.querySelector(".home-hero");
        const heroImage = document.querySelector(".home-hero-bg img");
        const roofline = document.querySelector(".home-hero-roofline");
        const proof = document.querySelector(".home-hero-proof");

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

                if (proof) {
                    proof.style.transform = `translate(${x * -5}px, ${y * -4}px)`;
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

                if (proof) {
                    proof.style.transform = "";
                }
            });
        };

        hero.addEventListener("pointermove", update);
        hero.addEventListener("pointerleave", reset);
    }

    /* =========================
       CTA BACKGROUND MOTION
       ========================= */

    function initCtaBackgroundMotion() {
        const cta = document.querySelector(".home-cta");
        const ctaImage = document.querySelector(".home-cta-bg img");
        const ctaPanel = document.querySelector(".home-cta-panel");

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

                if (ctaPanel) {
                    ctaPanel.style.transform = `translate(${x * -4}px, ${y * -3}px)`;
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

                if (ctaPanel) {
                    ctaPanel.style.transform = "";
                }
            });
        };

        cta.addEventListener("pointermove", update);
        cta.addEventListener("pointerleave", reset);
    }

    /* =========================
       INTERACTIVE ROW HOOKS
       ========================= */

    function initInteractiveRows() {
        const rows = document.querySelectorAll(
            ".home-factor-row, .home-model-block, .home-faq-note, .service-image-card, .service-strip-item"
        );

        if (!rows.length) return;

        rows.forEach((row, index) => {
            row.style.setProperty("--item-index", String(index + 1));

            row.addEventListener("pointerenter", () => {
                row.classList.add("is-hovered");
            });

            row.addEventListener("pointerleave", () => {
                row.classList.remove("is-hovered");
            });
        });
    }

    /* =========================
       SUBTLE POINTER GLOW
       ========================= */

    function initPointerGlow() {
        const glowTargets = document.querySelectorAll(
            ".home-hero-proof, .home-service-strip-inner, .home-model-blueprint, .home-factors-sticky, .home-cta-panel"
        );

        if (!glowTargets.length || prefersReducedMotion()) return;

        glowTargets.forEach((target) => {
            target.addEventListener("pointermove", (event) => {
                const rect = target.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                target.style.setProperty("--glow-x", `${x}%`);
                target.style.setProperty("--glow-y", `${y}%`);
            });

            target.addEventListener("pointerleave", () => {
                target.style.removeProperty("--glow-x");
                target.style.removeProperty("--glow-y");
            });
        });
    }
})();