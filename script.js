/**
 * BOUDI DIGITAL - Script Principal
 * Gestion de l'interface utilisateur.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des modules essentiels
    initNavigation();
});

/**
 * Gestion de la navigation mobile (Menu Burger)
 */
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        // Toggle du menu
        nav.classList.toggle('nav-active');

        // Animation des liens avec un délai progressif
        navLinks.forEach((link, index) => {
            link.style.animation = link.style.animation 
                ? '' 
                : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });

        // Animation de l'icône burger
        burger.classList.toggle('toggle');
    });
}
/* --- RESPONSIVE FORMULAIRE --- */
@media (max-width: 480px) {
    .fullname-wrapper {
        flex-direction: column !important; /* Empile le prénom et le nom */
        gap: 15px !important;
    }
    
    .jotform-container .form-textbox, 
    .jotform-container .form-textarea {
        width: 100% !important; /* Force la pleine largeur */
    }
}