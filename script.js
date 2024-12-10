// ===============================
// Global Variables and Selectors
// ===============================
const preloader = document.getElementById('preloader');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');

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
        setTimeout(() => preloader.style.display = 'none', 500); // Smooth fade-out
    }
}

// ===============================
// Hamburger Menu Management
// ===============================

/**
 * Toggles the mobile navigation menu.
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
// Sticky Header Management
// ===============================

/**
 * Adds or removes the sticky class to the header based on scroll position.
 */
function handleStickyHeader() {
    if (window.scrollY > 50) {
        addClass(header, 'sticky');
    } else {
        removeClass(header, 'sticky');
    }
}

// ===============================
// Smooth Scrolling
// ===============================

/**
 * Enables smooth scrolling to sections when navigation links are clicked.
 */
function enableSmoothScroll() {
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - header.offsetHeight,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// ===============================
// Section Visibility and Animations
// ===============================

/**
 * Observes sections and triggers animations when they enter the viewport.
 */
function observeSections() {
    const observerOptions = {
        root: null,
        threshold: 0.1, // Trigger when 10% of the section is visible
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
// Form Submission Handling
// ===============================

/**
 * Handles the contact form submission.
 */
function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been sent.`);
            form.reset(); // Clear the form fields
        } else {
            alert('Please fill out all fields before submitting.');
        }
    });
}

// ===============================
// Active Navigation Highlight
// ===============================

/**
 * Highlights the active navigation link based on the current section.
 */
function highlightActiveNav() {
    const scrollPosition = window.scrollY + header.offsetHeight + 10;

    links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
        ) {
            addClass(link, 'active');
        } else {
            removeClass(link, 'active');
        }
    });
}

// ===============================
// Initialization
// ===============================

/**
 * Initializes all the scripts after the DOM is fully loaded.
 */
function init() {
    hidePreloader();
    enableSmoothScroll();
    closeMenuOnClick();
    observeSections();
    handleFormSubmission();
}

// ===============================
// Event Listeners
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    init();
});

window.addEventListener('scroll', () => {
    handleStickyHeader();
    highlightActiveNav();
});
