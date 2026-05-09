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
        const config = window.SITE_CONFIG;

        if (!config) {
            console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/service-page.js.");
            return;
        }

        const service = getCurrentService(config);

        if (!service) {
            console.warn("No matching service found for this service page.");
            return;
        }

        initServicePageReadyState(service);
        injectServiceContent(service, config);
        renderServiceEvaluation(service);
        renderServiceFaq(service);
        renderRelatedServices(service, config);
        initServiceHeroMotion();
        initServiceFinalMotion();
        initServiceInteractiveBlocks();
        refreshIcons();
    });

    

    function getCurrentFile() {
        const file = window.location.pathname.split("/").pop();
        return file || "index.html";
    }

    function getCurrentService(config) {
        const currentFile = getCurrentFile();
        return config.services.find((service) => service.href === currentFile);
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

    

    function initServicePageReadyState(service) {
        document.body.classList.add("is-service-page", "is-service-ready");
        document.body.dataset.serviceId = service.id;
    }

    

    function injectServiceContent(service, config) {
        setText("[data-service-kicker]", service.pageKicker || service.kicker);
        setText("[data-service-title]", service.heroTitle || service.title);
        setText("[data-service-intro]", service.pageIntro || service.heroText || service.summary);

        setText("[data-service-context-title]", service.contextTitle);
        setText("[data-service-context-text]", service.contextText);

        setText("[data-service-evaluation-title]", service.evaluationTitle);
        setText("[data-service-evaluation-intro]", service.evaluationIntro);

        setText("[data-service-short-title]", service.shortTitle);
        setText("[data-service-full-title]", service.title);

        setImage(
            "[data-service-hero-image]",
            service.heroImage || service.image,
            `${service.shortTitle} roofing provider matching`
        );

        setImage(
            "[data-service-final-image]",
            config.images?.cta || service.heroImage || service.image,
            ""
        );

        const heroIconTargets = document.querySelectorAll("[data-service-icon]");
        heroIconTargets.forEach((icon) => {
            icon.setAttribute("data-lucide", service.icon || "home");
        });

        const contextPoints = document.querySelector("[data-service-context-points]");

        if (contextPoints) {
            const points = getContextPoints(service);

            contextPoints.innerHTML = points
                .map((point) => {
                    return `
            <div class="service-context-point">
              <span>
                <i data-lucide="${escapeHtml(point.icon)}" aria-hidden="true"></i>
              </span>
              <p>${escapeHtml(point.text)}</p>
            </div>
          `;
                })
                .join("");
        }
    }

    function getContextPoints(service) {
        const pointMap = {
            "roof-repair": [
                {
                    icon: "triangle-alert",
                    text: "Helpful repair notes may include leaks, stains, missing shingles, flashing issues, or visible surface concerns."
                },
                {
                    icon: "clock",
                    text: "Timing matters because provider availability may vary by ZIP code, season, and request urgency."
                },
                {
                    icon: "shield-check",
                    text: "Homeowners should verify licensing, insurance, scope, quote details, and warranty terms before hiring."
                }
            ],
            "roof-replacement": [
                {
                    icon: "layers",
                    text: "Replacement planning may include roof age, material interest, roof pitch, approximate size, and quote comparison needs."
                },
                {
                    icon: "ruler",
                    text: "A clearer scope can help homeowners compare written estimates, material details, cleanup expectations, and timelines."
                },
                {
                    icon: "shield-check",
                    text: "Homeowners should verify licensing, insurance, written agreements, warranties, and local requirements."
                }
            ],
            "roof-inspection": [
                {
                    icon: "search-check",
                    text: "Inspection requests may relate to visible concerns, post-storm review, home sale context, or maintenance planning."
                },
                {
                    icon: "file-check",
                    text: "Homeowners can ask providers about inspection scope, reporting format, fees, and follow-up recommendations."
                },
                {
                    icon: "shield-check",
                    text: "Provider credentials, insurance, inspection scope, and local requirements should be verified before scheduling."
                }
            ],
            "storm-damage-roofing": [
                {
                    icon: "cloud-rain",
                    text: "Storm-related notes may include hail, wind, missing shingles, debris impact, water stains, or visible roof changes."
                },
                {
                    icon: "file-check",
                    text: "Photos, storm timing, and visible concern notes can help organize the request before comparing provider options."
                },
                {
                    icon: "shield-check",
                    text: "RoofMatch does not handle insurance claims. Homeowners should verify details with providers and their insurance carrier independently."
                }
            ]
        };

        return pointMap[service.id] || [
            {
                icon: "list-checks",
                text: "Prepare category, ZIP code, timing, and project notes before comparing provider options."
            },
            {
                icon: "shield-check",
                text: "Verify provider credentials, insurance, quote details, written scope, and warranties before hiring."
            }
        ];
    }

    

    function renderServiceEvaluation(service) {
        const list = document.querySelector("[data-service-evaluation-list]");
        if (!list) return;

        const points = Array.isArray(service.evaluationPoints) ? service.evaluationPoints : [];

        list.innerHTML = points
            .map((point, index) => {
                return `
          <article class="service-evaluation-item reveal-up">
            <span class="service-evaluation-number">${String(index + 1).padStart(2, "0")}</span>
            <p>${escapeHtml(point)}</p>
          </article>
        `;
            })
            .join("");
    }

    

    function renderServiceFaq(service) {
        const container = document.querySelector("[data-service-faq-list]");
        if (!container) return;

        const items = Array.isArray(service.faqs) ? service.faqs : [];

        if (!items.length) return;

        container.innerHTML = items
            .map((item, index) => {
                const buttonId = `service-faq-${service.id}-${index}-button`;
                const panelId = `service-faq-${service.id}-${index}-panel`;

                return `
          <div class="faq-item">
            <h3 class="faq-question">
              <button
                type="button"
                id="${buttonId}"
                aria-expanded="false"
                aria-controls="${panelId}"
                data-service-faq-button
              >
                <span>${escapeHtml(item.question)}</span>
                <i data-lucide="plus" aria-hidden="true"></i>
              </button>
            </h3>

            <div
              class="faq-answer"
              id="${panelId}"
              role="region"
              aria-labelledby="${buttonId}"
              hidden
              data-service-faq-panel
            >
              <p>${escapeHtml(item.answer)}</p>
            </div>
          </div>
        `;
            })
            .join("");

        container.querySelectorAll("[data-service-faq-button]").forEach((button) => {
            button.addEventListener("click", () => {
                const panelId = button.getAttribute("aria-controls");
                const panel = document.getElementById(panelId);
                const isOpen = button.getAttribute("aria-expanded") === "true";

                if (!panel) return;

                button.setAttribute("aria-expanded", String(!isOpen));
                panel.hidden = isOpen;

                const icon = button.querySelector("[data-lucide]");
                if (icon) {
                    icon.setAttribute("data-lucide", isOpen ? "plus" : "minus");
                    refreshIcons();
                }
            });
        });

        injectServiceFaqSchema(service, items);
    }

    function injectServiceFaqSchema(service, items) {
        const schemaId = `faq-schema-${service.id}`;

        if (document.getElementById(schemaId)) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer
                }
            }))
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = schemaId;
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    

    function renderRelatedServices(currentService, config) {
        const container = document.querySelector("[data-related-services]");
        if (!container) return;

        const relatedServices = config.services.filter((service) => service.id !== currentService.id);

        container.innerHTML = relatedServices
            .map((service) => {
                return `
          <a
            class="service-image-card reveal-up"
            href="${escapeHtml(service.href)}"
            aria-label="${escapeHtml(service.title)}"
          >
            <img
              src="${escapeHtml(service.image)}"
              alt="${escapeHtml(service.shortTitle)}"
              loading="lazy"
            >

            <span class="service-image-card-overlay" aria-hidden="true"></span>

            <span class="service-image-card-icon">
              <i data-lucide="${escapeHtml(service.icon)}" aria-hidden="true"></i>
            </span>

            <span class="service-image-card-content">
              <small>${escapeHtml(service.kicker || "Roofing matching")}</small>
              <strong>${escapeHtml(service.shortTitle)}</strong>
              <span>${escapeHtml(service.cardText || service.summary)}</span>
            </span>

            <span class="service-image-card-line" aria-hidden="true"></span>
          </a>
        `;
            })
            .join("");
    }

    

    function initServiceHeroMotion() {
        const hero = document.querySelector(".service-hero");
        const heroImage = document.querySelector(".service-hero .hero-bg img, .service-hero [data-service-hero-image]");
        const roofline = document.querySelector(".service-hero .hero-roofline-mark");

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

    

    function initServiceFinalMotion() {
        const section = document.querySelector(".service-final");
        const image = document.querySelector(".service-final-bg img, [data-service-final-image]");
        const note = document.querySelector(".service-final-note");

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

    

    function initServiceInteractiveBlocks() {
        const blocks = document.querySelectorAll(
            ".service-context-callout, .service-context-point, .service-evaluation-item, .service-process-step, .service-final-note, .service-image-card"
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