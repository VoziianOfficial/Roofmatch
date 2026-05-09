"use strict";



window.SITE_CONFIG = {
    companyName: "RoofMatch",
    companyId: "RoofMatch Provider Matching LLC",

    brand: {
        shortName: "RoofMatch",
        tagline: "Compare local roofing provider options with clarity.",
        logoLabel: "RoofMatch home",
        logoText: "RoofMatch",
        themeName: "Dark Copper Roofline"
    },

    phone: "(800) 742-9186",
    phoneHref: "tel:+18007429186",
    phoneLabel: "Call RoofMatch at (800) 742-9186",
    phoneButtonText: "Call RoofMatch",

    email: "hello@roofmatchplatform.com",

    address: {
        line1: "1209 Orange Street",
        city: "Wilmington",
        state: "DE",
        zip: "19801",
        country: "USA",
        full: "1209 Orange Street, Wilmington, DE 19801, USA"
    },

    serviceArea: "USA roofing provider matching platform",

    footerText:
        "RoofMatch helps homeowners compare independent local roofing provider options across common residential roofing request categories.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "RoofMatch is an independent provider matching platform and does not perform roofing work directly.",

    navigation: [
        { label: "Home", href: "index.html" },
        { label: "Services", href: "services.html" },
        { label: "About", href: "about.html" },
        { label: "Contact", href: "contact.html" }
    ],

    legalLinks: [
        { label: "Privacy Policy", href: "privacy-policy.html" },
        { label: "Cookie Policy", href: "cookie-policy.html" },
        { label: "Terms of Service", href: "terms-of-service.html" }
    ],

    images: {
        homeHero: "./assets/images/roof-hero.jpg",
        servicesHero: "./assets/images/roof-services-hero.jpg",
        aboutHero: "./assets/images/roof-about.jpg",
        contactHero: "./assets/images/roof-contact.jpg",
        cta: "./assets/images/roof-cta.jpg",
        mapTexture: "./assets/images/roof-contact.jpg",

        roofRepair: "./assets/images/roof-repair.jpg",
        roofReplacement: "./assets/images/roof-replacement.jpg",
        roofInspection: "./assets/images/roof-inspection.jpg",
        stormDamage: "./assets/images/storm-damage-roofing.jpg",

        legalHero: "./assets/images/roof-hero.jpg"
    },

    services: [
        {
            id: "roof-repair",
            title: "Roof Repair Matching",
            shortTitle: "Roof Repair",
            href: "roof-repair.html",
            icon: "wrench",
            image: "./assets/images/roof-repair.jpg",
            heroImage: "./assets/images/roof-repair.jpg",
            kicker: "Repair request matching",
            summary:
                "Compare local provider options for leak, shingle, flashing, and visible roof repair requests.",
            cardText:
                "For leak notes, missing shingles, flashing concerns, water stains, and small visible roof issues.",
            heroTitle: "Compare local provider options for roof repair requests.",
            heroText:
                "RoofMatch helps homeowners organize repair-related roof details before comparing independent local provider options.",
            pageKicker: "Roof repair provider matching",
            pageIntro:
                "Prepare a clearer repair request with category, ZIP code, timing, visible concerns, and notes before reviewing provider options.",
            contextTitle: "Repair requests are easier to compare when the details are clear.",
            contextText:
                "Roof repair concerns can involve leaks, missing shingles, flashing issues, water stains, or visible roof surface problems. RoofMatch does not diagnose, inspect, or repair roofs directly. The platform helps homeowners prepare request details before comparing independent local provider options.",
            evaluationTitle: "Repair provider comparison factors",
            evaluationIntro:
                "Homeowners can compare independent provider options using practical details before choosing who to contact or hire.",
            evaluationPoints: [
                "Visible concern such as leak, stain, missing shingle, flashing issue, or surface damage",
                "Roof age, material type, and any accessible project notes",
                "Timing preference and whether the concern feels urgent",
                "ZIP code coverage and provider availability",
                "License, insurance, quote details, written scope, and warranty terms"
            ],
            faqs: [
                {
                    question: "Does RoofMatch repair roofs directly?",
                    answer:
                        "No. RoofMatch does not perform roof repair work directly. RoofMatch helps homeowners compare independent local provider options for repair-related requests."
                },
                {
                    question: "What details help with a roof repair request?",
                    answer:
                        "Helpful details may include ZIP code, visible concern, roof age, material type, timing, and notes about leaks, stains, missing shingles, flashing, or surface damage."
                },
                {
                    question: "Should homeowners verify a roof repair provider?",
                    answer:
                        "Yes. Homeowners should verify licensing, insurance, written scope, quote details, warranty terms, and local requirements before hiring a provider."
                }
            ]
        },

        {
            id: "roof-replacement",
            title: "Roof Replacement Matching",
            shortTitle: "Roof Replacement",
            href: "roof-replacement.html",
            icon: "layers",
            image: "./assets/images/roof-replacement.jpg",
            heroImage: "./assets/images/roof-replacement.jpg",
            kicker: "Replacement planning",
            summary:
                "Explore independent roofing provider options for full roof replacement planning and quote comparison.",
            cardText:
                "For aging roofs, material planning, full replacement requests, timing, and provider comparison.",
            heroTitle: "Explore provider options for roof replacement planning.",
            heroText:
                "RoofMatch helps homeowners organize replacement-related details before comparing independent local provider options.",
            pageKicker: "Roof replacement provider matching",
            pageIntro:
                "Prepare replacement planning details such as roof age, material interest, ZIP code, timing, and project notes.",
            contextTitle: "Replacement planning needs more than one basic request line.",
            contextText:
                "A roof replacement request may include roof age, size, slope, material interest, timing, and quote comparison needs. RoofMatch does not replace roofs directly and does not employ roofing crews. The platform helps organize details before homeowners compare independent provider options.",
            evaluationTitle: "Replacement provider comparison factors",
            evaluationIntro:
                "A clearer request can help homeowners compare provider options with more useful questions.",
            evaluationPoints: [
                "Roof age, approximate size, slope, and visible condition",
                "Material options and quote line-item clarity",
                "Estimated timing, scheduling needs, and project scope",
                "Provider availability by ZIP code",
                "License, insurance, warranty terms, cleanup details, and written agreement"
            ],
            faqs: [
                {
                    question: "Does RoofMatch replace roofs directly?",
                    answer:
                        "No. RoofMatch is not a roofing contractor and does not replace roofs directly. The platform helps homeowners compare independent local provider options."
                },
                {
                    question: "What information helps with replacement planning?",
                    answer:
                        "Helpful information may include roof age, approximate size, material preference, ZIP code, timing, visible concerns, and whether the homeowner wants to compare multiple quotes."
                },
                {
                    question: "Can replacement provider availability vary?",
                    answer:
                        "Yes. Provider availability may vary by ZIP code, project category, season, timing, and provider capacity."
                }
            ]
        },

        {
            id: "roof-inspection",
            title: "Roof Inspection Matching",
            shortTitle: "Roof Inspection",
            href: "roof-inspection.html",
            icon: "search-check",
            image: "./assets/images/roof-inspection.jpg",
            heroImage: "./assets/images/roof-inspection.jpg",
            kicker: "Condition review matching",
            summary:
                "Compare provider options for roof condition review, visible concerns, and inspection-related requests.",
            cardText:
                "For condition review, visible concerns, maintenance planning, post-storm review, or home sale context.",
            heroTitle: "Compare provider options for roof inspection requests.",
            heroText:
                "RoofMatch helps homeowners organize inspection-related request details before comparing independent provider options.",
            pageKicker: "Roof inspection provider matching",
            pageIntro:
                "Prepare the reason for inspection, ZIP code, visible concerns, timing, and preferred contact details.",
            contextTitle: "Inspection requests should explain why the roof needs review.",
            contextText:
                "A roof inspection or condition review request may relate to visible damage, maintenance planning, post-storm concerns, or buying and selling a home. RoofMatch does not inspect roofs directly. The platform helps homeowners organize details before comparing independent local provider options.",
            evaluationTitle: "Inspection provider comparison factors",
            evaluationIntro:
                "Homeowners may compare provider options based on inspection purpose, timing, property context, and verification details.",
            evaluationPoints: [
                "Reason for inspection or condition review",
                "Visible concerns such as stains, missing shingles, sagging, or storm-related signs",
                "Property timing, sale context, or maintenance planning",
                "ZIP code coverage and provider availability",
                "License, insurance, inspection scope, reporting format, and fee details"
            ],
            faqs: [
                {
                    question: "Does RoofMatch inspect roofs directly?",
                    answer:
                        "No. RoofMatch does not inspect roofs directly. It helps homeowners compare independent local provider options for inspection and roof condition review requests."
                },
                {
                    question: "When might a homeowner request a roof inspection?",
                    answer:
                        "A homeowner may request a roof condition review after visible concerns, after severe weather, before buying or selling a home, or while planning maintenance."
                },
                {
                    question: "What should be verified before scheduling an inspection?",
                    answer:
                        "Homeowners should verify provider credentials, inspection scope, fee structure, reporting format, insurance, and local requirements."
                }
            ]
        },

        {
            id: "storm-damage-roofing",
            title: "Storm Damage Roofing Matching",
            shortTitle: "Storm Damage",
            href: "storm-damage-roofing.html",
            icon: "cloud-rain",
            image: "./assets/images/storm-damage-roofing.jpg",
            heroImage: "./assets/images/storm-damage-roofing.jpg",
            kicker: "Storm-related request matching",
            summary:
                "Compare provider options for hail, wind, missing shingles, and storm-related roof concerns.",
            cardText:
                "For hail, wind, missing shingles, debris impact, visible storm concerns, and request documentation.",
            heroTitle: "Compare provider options for storm-related roofing concerns.",
            heroText:
                "RoofMatch helps homeowners organize storm-related roofing request details before comparing independent local provider options.",
            pageKicker: "Storm damage roofing provider matching",
            pageIntro:
                "Prepare notes about storm timing, visible concerns, ZIP code, photos if available, and preferred contact timing.",
            contextTitle: "Storm-related roof concerns need organized notes and careful comparison.",
            contextText:
                "Storm-related roofing requests may involve wind, hail, missing shingles, debris impact, or visible roof changes. RoofMatch does not perform storm damage roofing work directly and does not handle insurance claims. The platform helps homeowners prepare request details before comparing independent provider options.",
            evaluationTitle: "Storm-related provider comparison factors",
            evaluationIntro:
                "Homeowners may compare provider options based on visible concern, timing, provider availability, and verification details.",
            evaluationPoints: [
                "Type of storm concern such as wind, hail, missing shingles, or debris impact",
                "Visible damage notes and photos if available",
                "Timing needs and provider availability",
                "ZIP code coverage after weather events",
                "License, insurance, written scope, quote details, and documentation expectations"
            ],
            faqs: [
                {
                    question: "Does RoofMatch perform storm damage roofing work?",
                    answer:
                        "No. RoofMatch does not perform storm damage roofing work directly. The platform helps homeowners compare independent local provider options."
                },
                {
                    question: "Does RoofMatch handle insurance claims?",
                    answer:
                        "No. RoofMatch does not handle insurance claims. Homeowners should speak with their insurance carrier and verify any provider documentation or scope details independently."
                },
                {
                    question: "What details help with storm-related roof requests?",
                    answer:
                        "Helpful details may include ZIP code, storm timing, visible damage notes, photos if available, missing shingles, water stains, and preferred contact timing."
                }
            ]
        }
    ],

    forms: {
        requestTitle: "Start a roofing provider matching request",
        requestIntro:
            "Share your ZIP code, roofing category, timing, and project notes so your request is easier to review.",
        successMessage: "Your request details were prepared successfully.",
        errorMessage: "Please complete the required fields before submitting.",
        consentText:
            "I understand RoofMatch is an independent provider matching platform and does not perform roofing work directly.",
        categories: [
            "Roof Repair",
            "Roof Replacement",
            "Roof Inspection",
            "Storm Damage Roofing",
            "Not sure yet"
        ],
        timingOptions: [
            "As soon as possible",
            "This month",
            "Planning ahead",
            "Not sure"
        ]
    },

    cookieBanner: {
        storageKey: "roofmatch_policy_choice",
        title: "Privacy preferences",
        text:
            "RoofMatch uses basic site preferences to improve browsing and keep policy notices visible.",
        accept: "Accept",
        decline: "Decline",
        links: [
            { label: "Privacy Policy", href: "privacy-policy.html" },
            { label: "Cookie Policy", href: "cookie-policy.html" },
            { label: "Terms", href: "terms-of-service.html" }
        ]
    },

    pageMeta: {
        "index.html": {
            title: "RoofMatch | Compare Local Roofing Provider Options",
            description:
                "RoofMatch helps homeowners compare independent local roofing provider options for repair, replacement, inspection, and storm damage roofing requests."
        },
        "services.html": {
            title: "Roofing Matching Services | RoofMatch",
            description:
                "Explore roofing provider matching categories including repair, replacement, inspection, and storm damage roofing."
        },
        "about.html": {
            title: "About RoofMatch | Independent Roofing Matching Platform",
            description:
                "Learn how RoofMatch helps homeowners organize roofing project details and compare independent local provider options."
        },
        "contact.html": {
            title: "Contact RoofMatch | Start a Roofing Matching Request",
            description:
                "Contact RoofMatch to prepare a roofing provider matching request for local roofing categories."
        },
        "roof-repair.html": {
            title: "Roof Repair Provider Matching | RoofMatch",
            description:
                "Compare local provider options for roof repair concerns including leaks, shingles, flashing, and visible roof damage."
        },
        "roof-replacement.html": {
            title: "Roof Replacement Provider Matching | RoofMatch",
            description:
                "Explore independent roofing provider options for full roof replacement planning and quote comparison."
        },
        "roof-inspection.html": {
            title: "Roof Inspection Provider Matching | RoofMatch",
            description:
                "Compare provider options for roof inspection and roof condition review requests."
        },
        "storm-damage-roofing.html": {
            title: "Storm Damage Roofing Provider Matching | RoofMatch",
            description:
                "Compare roofing provider options for hail, wind, and storm-related roof damage concerns."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | RoofMatch",
            description: "Review the RoofMatch privacy policy."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | RoofMatch",
            description: "Review the RoofMatch cookie policy."
        },
        "terms-of-service.html": {
            title: "Terms of Service | RoofMatch",
            description: "Review the RoofMatch terms of service."
        }
    },

    home: {
        hero: {
            kicker: "Independent roofing provider matching",
            title: "Compare local roofing provider options with a sharper roof request.",
            text:
                "RoofMatch helps homeowners organize roofing project details and compare independent local provider options for repair, replacement, inspection, and storm-related roofing concerns.",
            image: "./assets/images/roof-hero.jpg",
            primaryCta: "Start roofing request",
            primaryHref: "contact.html",
            secondaryCta: "View services",
            secondaryHref: "services.html",
            note:
                "RoofMatch is not a roofing contractor and does not perform roofing work directly."
        },

        proofChips: [
            {
                icon: "list-checks",
                label: "Structured request details"
            },
            {
                icon: "map-pin",
                label: "ZIP-based provider availability"
            },
            {
                icon: "shield-check",
                label: "Verification reminders"
            }
        ],

        serviceStrip: {
            eyebrow: "Roofing categories",
            title: "Four focused request paths for common residential roofing needs.",
            text:
                "Choose the category that best matches the request, then prepare details before comparing independent provider options."
        },

        matchingModel: {
            eyebrow: "Aggregator model",
            title: "RoofMatch is built for comparison — not direct roofing work.",
            text:
                "The platform helps homeowners organize request details, understand service categories, and compare independent local provider options. RoofMatch does not repair, replace, inspect, or perform roofing work directly.",
            doesTitle: "What RoofMatch helps with",
            does: [
                "Organize roofing request details",
                "Route homeowners toward relevant roofing categories",
                "Support provider option comparison",
                "Remind homeowners to verify credentials before hiring"
            ],
            doesNotTitle: "What RoofMatch does not do",
            doesNot: [
                "Does not repair, replace, or inspect roofs directly",
                "Does not employ roofing crews or installers",
                "Does not guarantee provider work",
                "Does not replace homeowner verification"
            ]
        },

        comparisonFactors: {
            eyebrow: "Provider comparison factors",
            title: "A stronger request can make provider conversations clearer.",
            text:
                "Before comparing provider options, homeowners can prepare the details that usually matter most.",
            items: [
                {
                    icon: "list-checks",
                    label: "Service category",
                    text: "Repair, replacement, inspection, or storm-related concern."
                },
                {
                    icon: "search-check",
                    label: "Roof condition notes",
                    text: "Roof age, visible concerns, stains, missing shingles, or flashing issues."
                },
                {
                    icon: "layers",
                    label: "Material context",
                    text: "Shingle, metal, tile, flat roof, or not sure yet."
                },
                {
                    icon: "clock",
                    label: "Timing",
                    text: "As soon as possible, this month, planning ahead, or unsure."
                },
                {
                    icon: "map-pin",
                    label: "ZIP code availability",
                    text: "Provider availability may vary by location and category."
                },
                {
                    icon: "shield-check",
                    label: "Verification",
                    text: "Homeowners should verify licensing, insurance, scope, and quote details."
                }
            ]
        },

        cta: {
            eyebrow: "Start with clear details",
            title: "Prepare the request before comparing roofing provider options.",
            text:
                "Share the roofing category, ZIP code, timing, and project notes so the request is easier to review.",
            image: "./assets/images/roof-cta.jpg",
            primaryCta: "Start roofing request",
            primaryHref: "contact.html",
            secondaryCta: "Explore services",
            secondaryHref: "services.html"
        }
    },

    servicesPage: {
        hero: {
            kicker: "Roofing matching services",
            title: "Roofing request categories designed for provider comparison.",
            text:
                "Explore repair, replacement, inspection, and storm-related roofing request paths before preparing a provider matching request.",
            image: "./assets/images/roof-services-hero.jpg"
        },

        process: {
            eyebrow: "Request organization",
            title: "How matching requests are organized",
            steps: [
                {
                    icon: "list-checks",
                    title: "Choose a roofing category",
                    text:
                        "Select repair, replacement, inspection, storm-related roofing, or start with not sure yet."
                },
                {
                    icon: "map-pin",
                    title: "Add ZIP code and timing",
                    text:
                        "Location and timing help frame provider availability conversations."
                },
                {
                    icon: "clipboard-check",
                    title: "Share project notes",
                    text:
                        "Visible concerns, roof age, material type, and photos can help organize the request."
                },
                {
                    icon: "shield-check",
                    title: "Verify before hiring",
                    text:
                        "Review independent provider credentials, written scope, insurance, quote details, and warranties."
                }
            ]
        },

        checklist: {
            eyebrow: "Comparison checklist",
            title: "What homeowners may compare before choosing a provider",
            items: [
                "Provider licensing and insurance",
                "Written scope and quote details",
                "Availability by ZIP code",
                "Material and warranty information",
                "Cleanup, timeline, and communication expectations",
                "Reviews, references, and local requirements"
            ]
        },

        cta: {
            title: "Ready to prepare a roofing provider matching request?",
            text:
                "Start with the category, ZIP code, timing, and notes. RoofMatch does not perform roofing work directly.",
            href: "contact.html",
            label: "Start request"
        }
    },

    aboutPage: {
        hero: {
            kicker: "About RoofMatch",
            title: "A dark, sharp, independent roofing matching platform.",
            text:
                "RoofMatch helps homeowners organize roofing project details and compare independent local provider options without acting as a roofing contractor.",
            image: "./assets/images/roof-about.jpg"
        },

        story: {
            eyebrow: "Company story",
            title: "Roofing comparison starts with a better request.",
            text:
                "RoofMatch was built around a simple idea: homeowners should be able to clarify the category, location, timing, and visible concerns before speaking with providers. The platform focuses on request organization and provider comparison, not direct roofing work."
        },

        model: {
            eyebrow: "Platform model",
            title: "What RoofMatch does and does not do",
            does: [
                "Helps organize roofing project details",
                "Helps homeowners compare provider options",
                "Routes requests toward relevant roofing categories",
                "Reminds homeowners to verify credentials before hiring"
            ],
            doesNot: [
                "Does not inspect roofs",
                "Does not repair roofs",
                "Does not replace roofs",
                "Does not employ roofing crews",
                "Does not guarantee work performed by independent providers"
            ]
        },

        clarity: {
            eyebrow: "Request clarity",
            title: "Helpful details to prepare before comparing providers",
            items: [
                "Roof type or material if known",
                "Visible issue or reason for request",
                "Timing preference",
                "ZIP code",
                "Photos if applicable",
                "Preferred contact method"
            ]
        }
    },

    contactPage: {
        hero: {
            kicker: "Start request",
            title: "Prepare your roofing provider matching request.",
            text:
                "Share your roofing category, ZIP code, timing, and project notes. RoofMatch does not perform roofing work directly.",
            image: "./assets/images/roof-contact.jpg"
        },

        infoPanel: {
            eyebrow: "Contact information",
            title: "RoofMatch contact details",
            items: [
                {
                    icon: "phone",
                    label: "Phone",
                    valueKey: "phone"
                },
                {
                    icon: "mail",
                    label: "Email",
                    valueKey: "email"
                },
                {
                    icon: "map-pin",
                    label: "Address",
                    valueKey: "address.full"
                },
                {
                    icon: "home",
                    label: "Service area",
                    valueKey: "serviceArea"
                }
            ]
        },

        mapCard: {
            title: "USA provider matching coverage",
            text:
                "RoofMatch uses request details such as ZIP code and category to help homeowners compare independent local provider options.",
            markerLabel: "Wilmington, DE",
            addressText: "1209 Orange Street, Wilmington, DE 19801, USA"
        }
    },

    matchingSteps: [
        {
            icon: "list-checks",
            title: "Share the category",
            text:
                "Choose the roofing request type that best matches the homeowner's concern."
        },
        {
            icon: "map-pin",
            title: "Add ZIP code and timing",
            text:
                "Location and timing help frame provider availability conversations."
        },
        {
            icon: "search-check",
            title: "Compare provider options",
            text:
                "Review independent provider options and ask clear project questions."
        },
        {
            icon: "shield-check",
            title: "Verify before hiring",
            text:
                "Confirm licensing, insurance, written scope, quote details, and warranty terms."
        }
    ],

    faqs: {
        general: [
            {
                question: "How does RoofMatch help compare local roofing providers?",
                answer:
                    "RoofMatch helps homeowners organize roofing request details and compare independent local provider options across common residential roofing categories."
            },
            {
                question: "Does RoofMatch perform roofing work directly?",
                answer:
                    "No. RoofMatch is not a roofing contractor and does not repair, replace, inspect, or perform storm damage roofing work directly."
            },
            {
                question: "Are roofing quotes usually free?",
                answer:
                    "Quote practices can vary by provider, service category, location, and project details. Homeowners should confirm any quote or inspection fees directly with the provider."
            },
            {
                question: "What should homeowners verify before choosing a roofing provider?",
                answer:
                    "Homeowners should verify licensing, insurance, written scope, quote details, warranty terms, local requirements, and provider availability before hiring."
            },
            {
                question: "Can provider availability vary by ZIP code?",
                answer:
                    "Yes. Provider availability may vary by ZIP code, roofing category, season, timing, and provider capacity."
            }
        ],

        services: [
            {
                question: "Which roofing categories does RoofMatch support?",
                answer:
                    "RoofMatch supports provider matching requests for roof repair, roof replacement, roof inspection, and storm-related roofing concerns."
            },
            {
                question: "Can homeowners start if they are not sure which service they need?",
                answer:
                    "Yes. Homeowners can start with general notes and select not sure yet when preparing a request."
            },
            {
                question: "Does RoofMatch guarantee provider work?",
                answer:
                    "No. Independent providers are responsible for their own work. Homeowners should verify credentials, insurance, scope, quote details, and warranties before hiring."
            },
            {
                question: "Do service requests depend on location?",
                answer:
                    "Yes. Provider availability may vary by ZIP code, request type, timing, and local provider capacity."
            }
        ],

        about: [
            {
                question: "Is RoofMatch a roofing company?",
                answer:
                    "No. RoofMatch is an independent provider matching platform and does not perform roofing work directly."
            },
            {
                question: "Why does RoofMatch focus on request details?",
                answer:
                    "Clear request details can help homeowners compare provider options more efficiently and ask better questions before choosing a provider."
            },
            {
                question: "Does RoofMatch employ roofers or crews?",
                answer:
                    "No. RoofMatch does not employ roofers, crews, technicians, or installers."
            },
            {
                question: "What should homeowners prepare before contacting providers?",
                answer:
                    "Helpful details include ZIP code, roofing category, visible concerns, roof type, timing, photos if available, and preferred contact method."
            }
        ],

        contact: [
            {
                question: "What happens after submitting a request?",
                answer:
                    "The form prepares the homeowner's roofing request details for matching-related review. RoofMatch does not perform roofing work directly."
            },
            {
                question: "Is the contact form a contract for roofing work?",
                answer:
                    "No. Submitting the form does not create a roofing contract. Homeowners should review provider details, quotes, and agreements directly before hiring."
            },
            {
                question: "Can RoofMatch help with urgent roofing concerns?",
                answer:
                    "RoofMatch can help organize request details, but provider availability and response timing vary by location, category, and provider capacity."
            },
            {
                question: "Should homeowners verify providers independently?",
                answer:
                    "Yes. Homeowners should verify licensing, insurance, written scope, quote details, warranties, and local requirements before hiring."
            }
        ]
    },

    legalPages: {
        "privacy-policy.html": {
            kicker: "Privacy Policy",
            title: "Privacy Policy",
            updated: "Last updated: May 2026",
            image: "./assets/images/roof-hero.jpg",
            intro:
                "This Privacy Policy explains how RoofMatch may collect, use, and protect information submitted through this website.",
            sections: [
                {
                    title: "Information We May Collect",
                    text:
                        "RoofMatch may collect contact details, ZIP code, roofing category, timing preference, project notes, and basic website usage information when submitted through the site."
                },
                {
                    title: "How Information May Be Used",
                    text:
                        "Information may be used to prepare roofing provider matching requests, respond to inquiries, maintain website functionality, improve user experience, and display policy notices."
                },
                {
                    title: "Independent Providers",
                    text:
                        "RoofMatch is an independent provider matching platform. Independent providers are responsible for their own services, communications, estimates, agreements, and work."
                },
                {
                    title: "Data Choices",
                    text:
                        "Users may choose not to submit optional information. Browser settings may also control certain local storage or cookie-related preferences."
                },
                {
                    title: "Contact",
                    text:
                        "Questions about this Privacy Policy may be directed to RoofMatch using the contact information provided on this website."
                }
            ]
        },

        "cookie-policy.html": {
            kicker: "Cookie Policy",
            title: "Cookie Policy",
            updated: "Last updated: May 2026",
            image: "./assets/images/roof-hero.jpg",
            intro:
                "This Cookie Policy explains how RoofMatch uses basic site preferences and similar technologies.",
            sections: [
                {
                    title: "Basic Site Preferences",
                    text:
                        "RoofMatch may use local storage or similar browser-based preferences to remember privacy banner choices and improve browsing continuity."
                },
                {
                    title: "No Essential Blocking",
                    text:
                        "The policy banner is designed to remain compact and should not block core website navigation or request access."
                },
                {
                    title: "Managing Preferences",
                    text:
                        "Users may clear browser storage or adjust browser settings to remove stored preferences."
                },
                {
                    title: "Policy Links",
                    text:
                        "The website provides links to the Privacy Policy, Cookie Policy, and Terms of Service from the banner and footer."
                }
            ]
        },

        "terms-of-service.html": {
            kicker: "Terms of Service",
            title: "Terms of Service",
            updated: "Last updated: May 2026",
            image: "./assets/images/roof-hero.jpg",
            intro:
                "These Terms of Service describe the general conditions for using the RoofMatch website.",
            sections: [
                {
                    title: "Independent Platform",
                    text:
                        "RoofMatch is an independent provider matching platform. RoofMatch does not perform roofing work directly and is not a roofing contractor."
                },
                {
                    title: "No Guarantee of Work",
                    text:
                        "RoofMatch does not warrant or guarantee work performed by independent providers. Homeowners are responsible for verifying credentials, insurance, scope, pricing, warranties, and local requirements."
                },
                {
                    title: "Provider Availability",
                    text:
                        "Provider availability may vary by ZIP code, roofing category, timing, season, and provider capacity."
                },
                {
                    title: "User Responsibility",
                    text:
                        "Users are responsible for submitting accurate request information and reviewing provider details before entering into any agreement."
                },
                {
                    title: "Website Use",
                    text:
                        "The website is provided for informational and matching-request purposes. Use of the website does not create a roofing contract."
                }
            ]
        }
    }
};