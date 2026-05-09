"use strict";

/* ==========================================================
   ROOFMATCH — MAIN SHARED SCRIPT
   File: /js/main.js

   Controls:
   - page meta
   - shared header
   - shared footer
   - dynamic config injection
   - service cards
   - FAQ accordion + JSON-LD schema
   - policy banner
   - mobile menu with inert/focus handling
   - scroll reveal
   - image fallback class
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
        initScrollReveal();
        initImageFallbacks();

        const config = window.SITE_CONFIG;

        if (!config) {
            console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.");
            return;
        }

        normalizeBrandConfig(config);

        ensureSkipLink();
        applyPageMeta(config);
        injectSharedHeader(config);
        injectSharedFooter(config);
        applyDynamicConfigText(config);
        renderServiceCards(config);
        initFaqLists(config);
        applyGlobalConfigReplacements(config);
        initPolicyBanner(config);
        initMobileMenu();
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

    function getNestedValue(source, path) {
        if (!source || !path) return "";

        return String(path)
            .split(".")
            .reduce((value, key) => {
                if (value && Object.prototype.hasOwnProperty.call(value, key)) {
                    return value[key];
                }

                return "";
            }, source);
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach((element) => {
            element.textContent = value || "";
        });
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function normalizeBrandConfig(config) {
        if (!config || typeof config !== "object") return;
        if (!config.companyName) return;

        if (!config.brand || typeof config.brand !== "object") {
            config.brand = {};
        }

        if (!config.brand.logoText) {
            config.brand.logoText = config.companyName;
        }

        if (!config.brand.shortName) {
            config.brand.shortName = config.companyName;
        }

        if (!config.brand.logoLabel) {
            config.brand.logoLabel = `${config.companyName} home`;
        }
    }

    /* =========================
       ACCESSIBILITY
       ========================= */

    function ensureSkipLink() {
        if (document.querySelector(".skip-link")) return;

        const skipLink = document.createElement("a");
        skipLink.className = "skip-link";
        skipLink.href = "#main";
        skipLink.textContent = "Skip to content";

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /* =========================
       PAGE META
       ========================= */

    function applyPageMeta(config) {
        const currentFile = getCurrentFile();
        const pageMeta = config.pageMeta?.[currentFile];

        if (!pageMeta) {
            console.warn(`No pageMeta found for ${currentFile}`);
            return;
        }

        if (pageMeta.title) {
            document.title = pageMeta.title;
        }

        let description = document.querySelector('meta[name="description"]');

        if (!description) {
            description = document.createElement("meta");
            description.setAttribute("name", "description");
            document.head.appendChild(description);
        }

        description.setAttribute("content", pageMeta.description || "");
    }

    /* =========================
       HEADER
       ========================= */

    function injectSharedHeader(config) {
        const mount = document.querySelector("[data-site-header]");
        if (!mount) return;

        const currentFile = getCurrentFile();
        const serviceFiles = config.services.map((service) => service.href);
        const legalFiles = config.legalLinks.map((link) => link.href);

        const isServicePage = serviceFiles.includes(currentFile);
        const isLegalPage = legalFiles.includes(currentFile);

        const navLinks = config.navigation
            .map((item) => {
                const isActive =
                    item.href === currentFile ||
                    (item.href === "services.html" && isServicePage);

                return `
          <a
            class="site-nav-link${isActive ? " is-active" : ""}"
            href="${escapeHtml(item.href)}"
            ${isActive ? 'aria-current="page"' : ""}
          >
            ${escapeHtml(item.label)}
          </a>
        `;
            })
            .join("");

        const mobileNavLinks = config.navigation
            .map((item) => {
                const isActive =
                    item.href === currentFile ||
                    (item.href === "services.html" && isServicePage);

                return `
          <a
            class="mobile-menu-link${isActive ? " is-active" : ""}"
            href="${escapeHtml(item.href)}"
            ${isActive ? 'aria-current="page"' : ""}
          >
            ${escapeHtml(item.label)}
          </a>
        `;
            })
            .join("");

        const mobileServiceLinks = config.services
            .map((service) => {
                const isActive = service.href === currentFile;

                return `
          <a
            class="mobile-service-link${isActive ? " is-active" : ""}"
            href="${escapeHtml(service.href)}"
            ${isActive ? 'aria-current="page"' : ""}
          >
            <span>${escapeHtml(service.shortTitle)}</span>
            <i data-lucide="arrow-right" aria-hidden="true"></i>
          </a>
        `;
            })
            .join("");

        const mobileLegalLinks = config.legalLinks
            .map((item) => {
                const isActive = item.href === currentFile || isLegalPage;

                return `
          <a
            class="mobile-legal-link${isActive && item.href === currentFile ? " is-active" : ""}"
            href="${escapeHtml(item.href)}"
            ${item.href === currentFile ? 'aria-current="page"' : ""}
          >
            ${escapeHtml(item.label)}
          </a>
        `;
            })
            .join("");

        mount.innerHTML = `
      <header class="site-header" data-header>
        <div class="container site-header-inner">
          <a class="site-logo" href="index.html" aria-label="${escapeHtml(config.brand.logoLabel)}">
            <span class="site-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 76 44" role="img" focusable="false">
                <path class="site-logo-roof-main" d="M6 32 L38 8 L70 32"></path>
                <path class="site-logo-roof-sub" d="M18 34 L38 20 L58 34"></path>
                <path class="site-logo-roof-line" d="M28 38 H70"></path>
              </svg>
            </span>

            <span class="site-logo-text" data-company-name>${escapeHtml(config.companyName)}</span>
          </a>

          <nav class="site-nav" aria-label="Primary navigation">
            ${navLinks}
          </nav>

          <div class="site-header-actions">
            <a
              class="header-phone"
              href="${escapeHtml(config.phoneHref)}"
              aria-label="${escapeHtml(config.phoneLabel)}"
              data-phone-link
            >
              <i data-lucide="phone" aria-hidden="true"></i>
              <span data-phone-text="button">${escapeHtml(config.phoneButtonText || config.phone)}</span>
            </a>

            <button
              class="mobile-menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-controls="mobileMenu"
              aria-expanded="false"
              data-menu-open
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <aside class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" data-mobile-menu inert>
        <button class="mobile-menu-backdrop" type="button" aria-label="Close menu" data-menu-close></button>

        <div class="mobile-menu-panel" role="dialog" aria-modal="true" aria-labelledby="mobileMenuTitle">
          <div class="mobile-menu-top">
            <a class="site-logo mobile-menu-logo" href="index.html" aria-label="${escapeHtml(config.brand.logoLabel)}">
              <span class="site-logo-mark" aria-hidden="true">
                <svg viewBox="0 0 76 44" role="img" focusable="false">
                  <path class="site-logo-roof-main" d="M6 32 L38 8 L70 32"></path>
                  <path class="site-logo-roof-sub" d="M18 34 L38 20 L58 34"></path>
                  <path class="site-logo-roof-line" d="M28 38 H70"></path>
                </svg>
              </span>

              <span class="site-logo-text" data-company-name>${escapeHtml(config.companyName)}</span>
            </a>

            <button class="mobile-menu-close" type="button" aria-label="Close menu" data-menu-close>
              <i data-lucide="x" aria-hidden="true"></i>
            </button>
          </div>

          <div class="mobile-menu-content">
            <div class="mobile-menu-group">
              <p class="mobile-menu-label" id="mobileMenuTitle">Navigation</p>

              <nav class="mobile-menu-nav" aria-label="Mobile primary navigation">
                ${mobileNavLinks}
              </nav>
            </div>

            <div class="mobile-menu-group">
              <p class="mobile-menu-label">Roofing categories</p>

              <div class="mobile-service-list">
                ${mobileServiceLinks}
              </div>
            </div>

            <div class="mobile-menu-contact">
              <a href="${escapeHtml(config.phoneHref)}" data-phone-link>
                <i data-lucide="phone" aria-hidden="true"></i>
                <span data-phone-text>${escapeHtml(config.phone)}</span>
              </a>

              <a href="mailto:${escapeHtml(config.email)}" data-email-link>
                <i data-lucide="mail" aria-hidden="true"></i>
                <span data-email-text>${escapeHtml(config.email)}</span>
              </a>
            </div>

            <div class="mobile-menu-legal">
              ${mobileLegalLinks}
            </div>

            <p class="mobile-menu-note" data-legal-notice>
              ${escapeHtml(config.legalNotice)}
            </p>
          </div>
        </div>
      </aside>
    `;
    }

    /* =========================
       FOOTER
       ========================= */

    function injectSharedFooter(config) {
        const mount = document.querySelector("[data-site-footer]");
        if (!mount) return;

        const navLinks = config.navigation
            .map((item) => {
                return `
          <li>
            <a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
          </li>
        `;
            })
            .join("");

        const serviceLinks = config.services
            .map((service) => {
                return `
          <li>
            <a href="${escapeHtml(service.href)}">${escapeHtml(service.shortTitle)}</a>
          </li>
        `;
            })
            .join("");

        const legalLinks = config.legalLinks
            .map((item) => {
                return `
          <li>
            <a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
          </li>
        `;
            })
            .join("");

        const year = new Date().getFullYear();

        mount.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer-inner">
          <div class="footer-brand">
            <a class="site-logo footer-logo" href="index.html" aria-label="${escapeHtml(config.brand.logoLabel)}">
              <span class="site-logo-mark" aria-hidden="true">
                <svg viewBox="0 0 76 44" role="img" focusable="false">
                  <path class="site-logo-roof-main" d="M6 32 L38 8 L70 32"></path>
                  <path class="site-logo-roof-sub" d="M18 34 L38 20 L58 34"></path>
                  <path class="site-logo-roof-line" d="M28 38 H70"></path>
                </svg>
              </span>

              <span class="site-logo-text" data-company-name>${escapeHtml(config.companyName)}</span>
            </a>

            <p data-footer-text>${escapeHtml(config.footerText)}</p>

            <p class="footer-legal-note" data-legal-notice>
              ${escapeHtml(config.legalNotice)}
            </p>
          </div>

          <div class="footer-grid">
            <div class="footer-column">
              <h2>Navigation</h2>

              <ul>
                ${navLinks}
              </ul>
            </div>

            <div class="footer-column">
              <h2>Services</h2>

              <ul>
                ${serviceLinks}
              </ul>
            </div>

            <div class="footer-column">
              <h2>Contact</h2>

              <ul>
                <li>
                  <a href="${escapeHtml(config.phoneHref)}" data-phone-link>
                    <span data-phone-text>${escapeHtml(config.phone)}</span>
                  </a>
                </li>

                <li>
                  <a href="mailto:${escapeHtml(config.email)}" data-email-link>
                    <span data-email-text>${escapeHtml(config.email)}</span>
                  </a>
                </li>

                <li>
                  <span data-address-text>${escapeHtml(config.address.full)}</span>
                </li>

                <li>
                  <span data-service-area>${escapeHtml(config.serviceArea)}</span>
                </li>
              </ul>
            </div>

            <div class="footer-column">
              <h2>Legal</h2>

              <ul>
                ${legalLinks}
              </ul>
            </div>
          </div>

          <div class="footer-disclaimer">
            <p data-disclaimer>${escapeHtml(config.disclaimer)}</p>
          </div>

          <div class="footer-bottom">
            <p>
              © ${year} <span data-company-name>${escapeHtml(config.companyName)}</span>.
              <span data-company-id>${escapeHtml(config.companyId)}</span>.
            </p>
          </div>
        </div>
      </footer>
    `;
    }

    /* =========================
       DYNAMIC CONFIG TEXT
       ========================= */

    function applyDynamicConfigText(config) {
        setText("[data-company-name]", config.companyName);
        setText("[data-company-id]", config.companyId);
        setText("[data-email-text]", config.email);
        setText("[data-address-text]", config.address.full);
        setText("[data-footer-text]", config.footerText);
        setText("[data-service-area]", config.serviceArea);
        setText("[data-disclaimer]", config.disclaimer);
        setText("[data-legal-notice]", config.legalNotice);

        document.querySelectorAll("[data-phone-text]").forEach((element) => {
            const mode = element.getAttribute("data-phone-text");
            element.textContent =
                mode === "button" ? config.phoneButtonText || config.phone : config.phone;
        });

        document.querySelectorAll("[data-phone-link]").forEach((element) => {
            element.setAttribute("href", config.phoneHref);
            element.setAttribute("aria-label", config.phoneLabel);
        });

        document.querySelectorAll("[data-email-link]").forEach((element) => {
            element.setAttribute("href", `mailto:${config.email}`);
        });

        document.querySelectorAll("[data-config-value]").forEach((element) => {
            const path = element.getAttribute("data-config-value");
            const value = getNestedValue(config, path);
            element.textContent = value || "";
        });
    }

    /* =========================
       GLOBAL CONFIG REPLACEMENTS
       ========================= */

    function applyGlobalConfigReplacements(config) {
        if (!config) return;
        if (!document.body) return;

        const replacements = [
            ["RoofMatch Provider Matching LLC", config.companyId],
            ["RoofMatch is an independent provider matching platform and does not perform roofing work directly.", config.legalNotice],
            ["1209 Orange Street, Wilmington, DE 19801, USA", config.address?.full],
            ["USA roofing provider matching platform", config.serviceArea],
            ["tel:+18007429186", config.phoneHref],
            ["(800) 742-9186", config.phone],
            ["hello@roofmatchplatform.com", config.email],
            ["RoofMatch", config.companyName]
        ].filter(([from, to]) => {
            if (!from || typeof from !== "string") return false;
            if (!to || typeof to !== "string") return false;
            if (from === to) return false;
            return true;
        });

        if (!replacements.length) return;

        const shouldSkipElement = (element) => {
            if (!element || element.nodeType !== Node.ELEMENT_NODE) return true;
            return Boolean(element.closest("script,style,svg,template,noscript"));
        };

        const replaceAllInString = (value) => {
            let nextValue = value;

            replacements.forEach(([from, to]) => {
                if (!nextValue.includes(from)) return;
                nextValue = nextValue.replaceAll(from, to);
            });

            return nextValue;
        };

        const applyToTextNode = (textNode) => {
            if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

            const parentElement = textNode.parentElement;
            if (!parentElement || shouldSkipElement(parentElement)) return;

            const original = textNode.nodeValue;
            if (!original) return;

            const updated = replaceAllInString(original);
            if (updated !== original) {
                textNode.nodeValue = updated;
            }
        };

        const applyToAttributes = (root) => {
            if (!root) return;

            const attributeNames = ["href", "aria-label", "title", "alt", "content", "placeholder"];

            const elements =
                root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll("*")] : [];

            elements.forEach((element) => {
                if (shouldSkipElement(element)) return;

                attributeNames.forEach((attributeName) => {
                    if (!element.hasAttribute(attributeName)) return;

                    const original = element.getAttribute(attributeName);
                    if (!original) return;

                    const updated = replaceAllInString(original);
                    if (updated !== original) {
                        element.setAttribute(attributeName, updated);
                    }
                });
            });
        };

        const applyToSubtree = (root) => {
            if (!root) return;

            if (root.nodeType === Node.TEXT_NODE) {
                applyToTextNode(root);
                return;
            }

            if (root.nodeType !== Node.ELEMENT_NODE) return;
            if (shouldSkipElement(root)) return;

            const walker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(node) {
                        if (!node || node.nodeType !== Node.TEXT_NODE) return NodeFilter.FILTER_REJECT;

                        const parentElement = node.parentElement;
                        if (!parentElement || shouldSkipElement(parentElement)) return NodeFilter.FILTER_REJECT;

                        const value = node.nodeValue;
                        if (!value) return NodeFilter.FILTER_REJECT;

                        for (const [from] of replacements) {
                            if (value.includes(from)) {
                                return NodeFilter.FILTER_ACCEPT;
                            }
                        }

                        return NodeFilter.FILTER_REJECT;
                    }
                },
                false
            );

            while (walker.nextNode()) {
                applyToTextNode(walker.currentNode);
            }

            applyToAttributes(root);
        };

        applyToSubtree(document.body);

        if (document.body.dataset.configReplacementsObserved === "true") return;
        document.body.dataset.configReplacementsObserved = "true";

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    applyToSubtree(node);
                });
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    /* =========================
       SERVICE CARDS
       ========================= */

    function renderServiceCards(config) {
        const containers = document.querySelectorAll("[data-service-cards]");
        if (!containers.length) return;

        containers.forEach((container) => {
            const variant = container.getAttribute("data-service-cards") || "image";

            container.innerHTML = config.services
                .map((service) => {
                    if (variant === "strip") {
                        return `
              <a class="service-strip-item reveal-up" href="${escapeHtml(service.href)}">
                <span class="service-strip-icon">
                  <i data-lucide="${escapeHtml(service.icon)}" aria-hidden="true"></i>
                </span>

                <span class="service-strip-copy">
                  <strong>${escapeHtml(service.shortTitle)}</strong>
                  <small>${escapeHtml(service.summary)}</small>
                </span>
              </a>
            `;
                    }

                    if (variant === "structured") {
                        return `
              <article class="service-structured-card reveal-up">
                <a
                  class="service-structured-image"
                  href="${escapeHtml(service.href)}"
                  aria-label="${escapeHtml(service.title)}"
                >
                  <img
                    src="${escapeHtml(service.image)}"
                    alt="${escapeHtml(service.shortTitle)}"
                    loading="lazy"
                  >
                </a>

                <div class="service-structured-content">
                  <div class="service-structured-topline">
                    <span>
                      <i data-lucide="${escapeHtml(service.icon)}" aria-hidden="true"></i>
                    </span>

                    <small>${escapeHtml(service.kicker || "Roofing category")}</small>
                  </div>

                  <h3>${escapeHtml(service.title)}</h3>

                  <p>${escapeHtml(service.cardText || service.summary)}</p>

                  <a class="text-link" href="${escapeHtml(service.href)}">
                    View matching category
                    <i data-lucide="arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </article>
            `;
                    }

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
        });

        refreshIcons();
    }

    /* =========================
       FAQ
       ========================= */

    function initFaqLists(config) {
        const faqContainers = document.querySelectorAll("[data-faq-list]");
        if (!faqContainers.length) return;

        faqContainers.forEach((container, containerIndex) => {
            const faqKey = container.getAttribute("data-faq-list") || "general";
            const items = config.faqs?.[faqKey];

            if (!Array.isArray(items) || !items.length) return;

            container.innerHTML = items
                .map((item, index) => {
                    const buttonId = `faq-${faqKey}-${containerIndex}-${index}-button`;
                    const panelId = `faq-${faqKey}-${containerIndex}-${index}-panel`;

                    return `
            <div class="faq-item">
              <h3 class="faq-question">
                <button
                  type="button"
                  id="${buttonId}"
                  aria-expanded="false"
                  aria-controls="${panelId}"
                  data-faq-button
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
                data-faq-panel
              >
                <p>${escapeHtml(item.answer)}</p>
              </div>
            </div>
          `;
                })
                .join("");

            injectFaqSchema(faqKey, items);
        });

        document.querySelectorAll("[data-faq-button]").forEach((button) => {
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

        refreshIcons();
    }

    function injectFaqSchema(faqKey, items) {
        const currentFile = getCurrentFile();
        const schemaId = `faq-schema-${currentFile}-${faqKey}`;

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

    /* =========================
       POLICY BANNER
       ========================= */

    function initPolicyBanner(config) {
        const bannerConfig = config.cookieBanner;
        if (!bannerConfig?.storageKey) return;

        let storedChoice = null;

        try {
            storedChoice = window.localStorage.getItem(bannerConfig.storageKey);
        } catch (error) {
            storedChoice = null;
        }

        if (storedChoice) return;
        if (document.querySelector("[data-policy-banner]")) return;

        const links = bannerConfig.links
            .map((item) => {
                return `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
            })
            .join("");

        const banner = document.createElement("section");
        banner.className = "policy-banner";
        banner.setAttribute("data-policy-banner", "");
        banner.setAttribute("aria-label", "Privacy preferences");

        banner.innerHTML = `
      <div class="policy-banner-copy">
        <strong>${escapeHtml(bannerConfig.title)}</strong>
        <p>${escapeHtml(bannerConfig.text)}</p>

        <div class="policy-banner-links">
          ${links}
        </div>
      </div>

      <div class="policy-banner-actions">
        <button class="btn btn-secondary btn-small" type="button" data-policy-decline>
          ${escapeHtml(bannerConfig.decline)}
        </button>

        <button class="btn btn-primary btn-small" type="button" data-policy-accept>
          ${escapeHtml(bannerConfig.accept)}
        </button>
      </div>
    `;

        document.body.appendChild(banner);

        const saveChoice = (choice) => {
            try {
                window.localStorage.setItem(bannerConfig.storageKey, choice);
            } catch (error) {
                console.warn("Could not save policy preference.", error);
            }

            banner.classList.add("is-hiding");

            window.setTimeout(() => {
                banner.remove();
            }, 220);
        };

        banner.querySelector("[data-policy-accept]")?.addEventListener("click", () => {
            saveChoice("accepted");
        });

        banner.querySelector("[data-policy-decline]")?.addEventListener("click", () => {
            saveChoice("declined");
        });
    }

    /* =========================
       MOBILE MENU
       ========================= */

    function initMobileMenu() {
        const menu = document.querySelector("[data-mobile-menu]");
        const openButton = document.querySelector("[data-menu-open]");
        const closeButtons = document.querySelectorAll("[data-menu-close]");

        if (!menu || !openButton) return;

        let lastFocusedElement = null;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "textarea:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            '[tabindex]:not([tabindex="-1"])'
        ].join(",");

        const setMenuInert = (isInert) => {
            if (isInert) {
                menu.setAttribute("inert", "");
                menu.inert = true;
            } else {
                menu.removeAttribute("inert");
                menu.inert = false;
            }
        };

        const getFocusableItems = () => {
            return Array.from(menu.querySelectorAll(focusableSelector)).filter((item) => {
                return item.offsetParent !== null || item === document.activeElement;
            });
        };

        const openMenu = () => {
            lastFocusedElement = document.activeElement;

            document.body.classList.add("is-menu-open");
            menu.classList.add("is-open");
            openButton.setAttribute("aria-expanded", "true");
            openButton.setAttribute("aria-label", "Close menu");
            setMenuInert(false);

            window.requestAnimationFrame(() => {
                const firstFocusable = getFocusableItems()[0];
                if (firstFocusable) firstFocusable.focus();
            });
        };

        const closeMenu = () => {
            document.body.classList.remove("is-menu-open");
            menu.classList.remove("is-open");
            openButton.setAttribute("aria-expanded", "false");
            openButton.setAttribute("aria-label", "Open menu");
            setMenuInert(true);

            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus();
            }
        };

        setMenuInert(true);

        openButton.addEventListener("click", () => {
            const isOpen = openButton.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        closeButtons.forEach((button) => {
            button.addEventListener("click", closeMenu);
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (!menu.classList.contains("is-open")) return;

            if (event.key === "Escape") {
                closeMenu();
                return;
            }

            if (event.key !== "Tab") return;

            const focusableItems = getFocusableItems();
            if (!focusableItems.length) return;

            const firstItem = focusableItems[0];
            const lastItem = focusableItems[focusableItems.length - 1];

            if (event.shiftKey && document.activeElement === firstItem) {
                event.preventDefault();
                lastItem.focus();
            } else if (!event.shiftKey && document.activeElement === lastItem) {
                event.preventDefault();
                firstItem.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024 && menu.classList.contains("is-open")) {
                closeMenu();
            }
        });
    }

    /* =========================
       SCROLL REVEAL
       ========================= */

    function initScrollReveal() {
        const root = document.querySelector("main") || document.body;
        if (!root) return;

        const prefersReducedMotion =
            window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const makeVisible = (element) => {
            if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
            element.classList.add("is-visible");
        };

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            root.querySelectorAll(".reveal-up").forEach(makeVisible);

            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

                        if (node.classList.contains("reveal-up")) {
                            makeVisible(node);
                        }

                        node.querySelectorAll?.(".reveal-up").forEach(makeVisible);
                    });
                });
            });

            mutationObserver.observe(root, { childList: true, subtree: true });
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        const observeElement = (element) => {
            if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
            if (element.classList.contains("is-visible")) return;
            if (element.dataset.revealObserved === "true") return;

            element.dataset.revealObserved = "true";
            observer.observe(element);
        };

        root.querySelectorAll(".reveal-up").forEach(observeElement);

        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

                    if (node.classList.contains("reveal-up")) {
                        observeElement(node);
                    }

                    node.querySelectorAll?.(".reveal-up").forEach(observeElement);
                });
            });
        });

        mutationObserver.observe(root, { childList: true, subtree: true });

        window.setTimeout(() => {
            root.querySelectorAll(".reveal-up:not(.is-visible)").forEach(makeVisible);
        }, 5000);
    }

    /* =========================
       IMAGE FALLBACKS
       ========================= */

    function initImageFallbacks() {
        document.querySelectorAll("img").forEach((image) => {
            image.addEventListener(
                "error",
                () => {
                    image.classList.add("is-missing");
                    image.setAttribute("alt", image.getAttribute("alt") || "Roofing image unavailable");
                },
                { once: true }
            );
        });
    }
})();
