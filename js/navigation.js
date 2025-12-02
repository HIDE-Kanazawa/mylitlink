document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const siteNav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');
    const externalDropdown = document.querySelector('.external-dropdown');
    const externalToggle = document.querySelector('.external-dropdown__toggle');
    const externalLinks = document.querySelectorAll('.external-dropdown__menu a');
    const body = document.body;
    let scrollPosition = 0;

    if (!hamburgerBtn || !siteNav) return;

    // Toggle Menu
    hamburgerBtn.addEventListener('click', () => {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isExpanded);
    });

    // Close menu when a link is clicked; smooth-scroll for in-page anchors after layout settles
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only intervene if the mobile menu is active
            if (!siteNav.classList.contains('is-active')) return;

            const href = link.getAttribute('href') || '';
            const isHashLink = href.startsWith('#');

            if (isHashLink) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    e.stopImmediatePropagation(); // Stop motion.js from running

                    // Calculate target position BEFORE unlocking body
                    // When body is fixed, window.scrollY is 0, so we must use the saved scrollPosition
                    const header = document.querySelector('.site-header');
                    const offset = header ? header.offsetHeight + 8 : 0;
                    const targetY = target.getBoundingClientRect().top + scrollPosition - offset;

                    toggleMenu(false, true);

                    setTimeout(() => {
                        window.scrollTo({
                            top: targetY,
                            behavior: 'smooth'
                        });
                        history.replaceState(null, '', href);
                    }, 60);
                    return;
                }
            }

            // For external links or if target not found, just close the menu
            toggleMenu(false, true);
        });
    });

    if (externalToggle && externalDropdown) {
        externalToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const willOpen = !externalDropdown.classList.contains('is-open');
            closeExternalDropdown();
            if (willOpen) {
                externalDropdown.classList.add('is-open');
                externalToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    externalLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeExternalDropdown();
        });
    });

    // Global click handling for closing menu and dropdown
    document.addEventListener('click', (e) => {
        const clickedOutsideNav = siteNav.classList.contains('is-active') &&
            !siteNav.contains(e.target) &&
            !hamburgerBtn.contains(e.target);

        const clickedOutsideDropdown = externalDropdown &&
            !externalDropdown.contains(e.target) &&
            (!externalToggle || !externalToggle.contains(e.target));

        if (clickedOutsideNav) {
            toggleMenu(false);
        }

        if (clickedOutsideDropdown) {
            closeExternalDropdown();
        }
    });



    function closeExternalDropdown() {
        if (!externalDropdown) return;
        externalDropdown.classList.remove('is-open');
        if (externalToggle) {
            externalToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function toggleMenu(show, restoreScroll = true) {
        hamburgerBtn.setAttribute('aria-expanded', show);
        if (show) {
            scrollPosition = window.scrollY;
            hamburgerBtn.classList.add('is-active');
            siteNav.classList.add('is-active');

            // Robust scroll lock for mobile
            body.style.position = 'fixed';
            body.style.top = `-${scrollPosition}px`;
            body.style.width = '100%';
            body.style.overflowY = 'scroll'; // Prevent layout shift
        } else {
            hamburgerBtn.classList.remove('is-active');
            siteNav.classList.remove('is-active');
            closeExternalDropdown();

            // Restore scroll (unless navigation should jump)
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflowY = '';
            if (restoreScroll) {
                window.scrollTo(0, scrollPosition);
            }
        }
    }

    function smoothScrollTo(target, hash) {
        const header = document.querySelector('.site-header');
        const offset = header ? header.offsetHeight + 8 : 0;
        const targetY = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });

        if (hash) {
            history.replaceState(null, '', hash);
        }
    }
});
