document.addEventListener("DOMContentLoaded", () => {
    // Preloader
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.style.display = "none";
    });

    // Dark Mode Toggle
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    toggleDarkMode.addEventListener("click", () => {
        document
      
