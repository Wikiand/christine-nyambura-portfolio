/* =========================================
   CHRISTINE NYAMBURA
   PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   THEME
========================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

function updateThemeIcon() {

    const icon = themeToggle.querySelector(".theme-icon");

    if (document.body.classList.contains("light")) {
        icon.textContent = "☾";
    } else {
        icon.textContent = "◐";
    }
}

updateThemeIcon();


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();
});


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================
   TERMINAL CURSOR
========================================= */

const cursor =
    document.querySelector(".terminal-cursor");

if (cursor) {

    let visible = true;

    setInterval(() => {

        visible = !visible;

        cursor.style.opacity =
            visible ? "1" : "0";

    }, 550);
}


/* =========================================
   INTERSECTION OBSERVER
   Subtle reveal animation
========================================= */

const revealElements = document.querySelectorAll(
    ".security-card, .project-card, .skill-column, .timeline-item, .credential, .contact-card"
);

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (!prefersReducedMotion) {

    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(14px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                });

                const activeLink =
                    document.querySelector(
                        `.main-nav a[href="#${entry.target.id}"]`
                    );

                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});