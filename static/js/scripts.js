document.addEventListener("DOMContentLoaded", () => {
    // Preloader: Hide preloader after the page fully loads
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.style.display = "none";
    });

    // Dark Mode Toggle: Add or remove the "dark-mode" class from the body
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Update button text based on the current mode
        toggleDarkMode.textContent = document.body.classList.contains("dark-mode")
            ? "Light Mode"
            : "Dark Mode";
    });

    // Smooth Scroll for Navigation: Scroll to sections smoothly when clicking on nav links
    document.querySelectorAll("nav a").forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            const targetId = anchor.getAttribute("href").substring(1); // Get target ID
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth", // Smooth scrolling
                    block: "start",    // Align to the top of the section
                });
            }
        });
    });

    // Dynamically Load Testimonials: Fetch content from Python script
    fetch("features/testimonials.py")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch testimonials.");
            return response.text();
        })
        .then((data) => {
            const testimonialsContent = document.getElementById("testimonials-content");
            if (testimonialsContent) testimonialsContent.innerHTML = data;
        })
        .catch((error) => console.error("Error loading testimonials:", error));

    // Dynamically Load FAQ: Fetch content from Python script
    fetch("features/faq.py")
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch FAQ.");
            return response.text();
        })
        .then((data) => {
            const faqContent = document.getElementById("faq-content");
            if (faqContent) faqContent.innerHTML = data;
        })
        .catch((error) => console.error("Error loading FAQ:", error));
});
