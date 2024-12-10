// ===============================
// Global Variables and Selectors
// ===============================
const preloader = document.getElementById('preloader');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

// ===============================
// Utility Functions
// ===============================
/**
 * Toggles a CSS class on an element.
 * @param {HTMLElement} element - The element to toggle the class on.
 * @param {string} className - The class to toggle.
 */
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

/**
 * Adds a CSS class to an element.
 * @param {HTMLElement} element - The element to add the class to.
 * @param {string} className - The class to add.
 */
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

/**
 * Removes a CSS class from an element.
 * @param {HTMLElement} element - The element to remove the class from.
 * @param {string} className - The class to remove.
 */
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

// ===============================
// Preloader Management
// ===============================
/**
 * Hides the preloader once the page has fully loaded.
 */
function hidePreloader() {
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500); // Smooth transition
    }
}

// ===============================
// Hamburger Menu Management
// ===============================
/**
 * Toggles the navigation menu for mobile view.
 */
function toggleMenu() {
    toggleClass(navLinks, 'active');
}

/**
 * Closes the navigation menu when a link is clicked.
 */
function closeMenuOnClick() {
    links.forEach(link => {
        link.addEventListener('click', () => {
            removeClass(navLinks, 'active');
        });
    });
}

// ===============================
// Scroll Event Handlers
// ===============================
/**
 * Adds a sticky class to the header when the user scrolls down.
 */
function handleStickyHeader() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;

    if (header) {
        if (scrollPosition > 50) {
            addClass(header, 'sticky');
        } else {
            removeClass(header, 'sticky');
        }
    }
}

// ===============================
// Smooth Scroll Implementation
// ===============================
/**
 * Smoothly scrolls to the target section when a navigation link is clicked.
 */
function enableSmoothScroll() {
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// ===============================
// Intersection Observer for Animations
// ===============================
/**
 * Animates sections when they enter the viewport.
 */
function observeSections() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addClass(entry.target, 'visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ===============================
// DOM Content Loaded Event
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Hide the preloader
    hidePreloader();

    // Set up hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    closeMenuOnClick();

    // Enable smooth scrolling
    enableSmoothScroll();

    // Observe sections for animations
    observeSections();
});

// ===============================
// Scroll Event Listener
// ===============================
window.addEventListener('scroll', () => {
    handleStickyHeader();
});
