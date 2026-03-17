/**
 * BOUDI DIGITAL - Script Principal
 * Gestion de l'interface utilisateur.
 */

document.addEventListener('DOMContentLoaded', () => {
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
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animation de l'icône burger
        burger.classList.toggle('toggle');
    });

    // FERMER LE MENU QUAND ON CLIQUE SUR UN LIEN
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(l => l.style.animation = '');
            }
        });
    });
}