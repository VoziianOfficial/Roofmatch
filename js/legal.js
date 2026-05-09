"use strict";

/* ==========================================================
   ROOFMATCH — LEGAL PAGE SCRIPT
   File: /js/legal.js

   Purpose:
   - detect current legal page
   - inject policy content from SITE_CONFIG.legalPages
   - render legal sidebar links
   - active legal link state
   - subtle hero/CTA photo motion
   - hover hooks
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
        const config = window.SITE_CONFIG;

        if (!config) {
            console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/legal.js.");
            return;
        }

        const currentFile = getCurrentFile();
        const legalPage = config.legalPages?.[currentFile];

        if (!legalPage) {
            console.warn(`No legal page config found for ${currentFile}`);
            return;
        }

        initLegalReadyState(currentFile);
        injectLegalContent(legalPage, config, currentFile);
        renderLegalSidebar(config, currentFile);
        initLegalHeroMotion();
        initLegalCtaMotion();
        initLegalInteractiveBlocks();
        refreshIcons();
    });

    /* =========================
       HELPERS
       ========================= */

    function getCurrentFile() {
        const file = window.location.pathname.split("/").pop();
        return file || "index.html";
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function setImage(selector, src, alt) {
        document.querySelectorAll(selector).forEach((image) => {
            image.setAttribute("src", src || "");
            image.setAttribute("alt", alt || "");
        });
    }

    /* =========================
       READY STATE
       ========================= */

    function initLegalReadyState(currentFile) {
        document.body.classList.add("is-legal-page", "is-legal-ready");
        document.body.dataset.legalPage = currentFile.replace(".html", "");
    }

    /* =========================
       CONTENT INJECTION
       ========================= */

    function injectLegalContent(legalPage, config, currentFile) {
        setText("[data-legal-kicker]", legalPage.kicker);
        setText("[data-legal-title]", legalPage.title);
        setText("[data-legal-updated]", legalPage.updated);
        setText("[data-legal-intro]", legalPage.intro);

        setImage("[data-legal-hero-image]", legalPage.image || config.images?.legalHero, "");
        setImage("[data-legal-cta-image]", config.images?.cta || config.images?.legalHero, "");

        const documentTitle = document.querySelector("[data-legal-document-title]");
        if (documentTitle) {
            documentTitle.textContent = legalPage.title || "";
        }

        const sectionsContainer = document.querySelector("[data-legal-sections]");

        if (sectionsContainer && Array.isArray(legalPage.sections)) {
            sectionsContainer.innerHTML = legalPage.sections
                .map((section) => {
                    return `
            <section class="legal-section reveal-up">
              <h2>${escapeHtml(section.title)}</h2>
              <p>${escapeHtml(section.text)}</p>
            </section>
          `;
                })
                .join("");
        }

        const disclaimerBlock = document.querySelector("[data-legal-disclaimer-block]");

        if (disclaimerBlock) {
            disclaimerBlock.innerHTML = `
        <strong>Disclaimer</strong>
        <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
      `;
        }

        const ctaTitle = document.querySelector("[data-legal-cta-title]");
        const ctaText = document.querySelector("[data-legal-cta-text]");

        if (ctaTitle) {
            ctaTitle.textContent = "Questions about RoofMatch policies or provider matching?";
        }

        if (ctaText) {
            ctaText.textContent =
                "RoofMatch is an independent roofing provider matching platform. Review the platform model or start a request with clear roofing project details.";
        }

        markLegalPageLinks(currentFile);
    }

    /* =========================
       SIDEBAR
       ========================= */

    function renderLegalSidebar(config, currentFile) {
        const container = document.querySelector("[data-legal-sidebar-links]");
        if (!container) return;

        container.innerHTML = config.legalLinks
            .map((link) => {
                const isActive = link.href === currentFile;

                return `
          <a
            href="${escapeHtml(link.href)}"
            class="${isActive ? "is-active" : ""}"
            ${isActive ? 'aria-current="page"' : ""}
          >
            ${escapeHtml(link.label)}
          </a>
        `;
            })
            .join("");
    }

    function markLegalPageLinks(currentFile) {
        document.querySelectorAll(`a[href="${currentFile}"]`).forEach((link) => {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        });
    }

    /* =========================
       HERO PHOTO MOTION
       ========================= */

    function initLegalHeroMotion() {
        const hero = document.querySelector(".legal-hero");
        const heroImage = document.querySelector(".legal-hero .hero-bg img, [data-legal-hero-image]");
        const roofline = document.querySelector(".legal-hero .hero-roofline-mark");

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
                    heroImage.style.transform = `scale(1.04) translate(${x * -8}px, ${y * -5}px)`;
                }

                if (roofline) {
                    roofline.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
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

    /* =========================
       CTA PHOTO MOTION
       ========================= */

    function initLegalCtaMotion() {
        const cta = document.querySelector(".legal-cta");
        const ctaImage = document.querySelector(".legal-cta-bg img, [data-legal-cta-image]");
        const note = document.querySelector(".legal-cta-note");

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

    /* =========================
       HOVER HOOKS
       ========================= */

    function initLegalInteractiveBlocks() {
        const blocks = document.querySelectorAll(
            ".legal-sidebar-card, .legal-document, .legal-section, .legal-disclaimer-block, .legal-cta-note"
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