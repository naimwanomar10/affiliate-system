document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.style.display = "none";
    });

    // Dark Mode Toggle
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleDarkMode.textContent = document.body.classList.contains("dark-mode")
            ? "Light Mode"
            : "Dark Mode";
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll("nav a").forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // Load Testimonials
    fetch("features/testimonials.py")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("testimonials-content").innerHTML = data;
        });

    // Load FAQ
    fetch("features/faq.py")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("faq-content").innerHTML = data;
        });
});
