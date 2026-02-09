/**
 * BOUDI DIGITAL - Script Principal
 * Gestion de l'interface utilisateur et des appels API asynchrones.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des modules
    initNavigation();
    initContactForm();
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

/**
 * Gestion du formulaire de contact
 * Envoi des données vers le backend PHP via Fetch API
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const statusDisplay = document.getElementById('form-status');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Extraction et préparation des données
        const payload = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        displayStatus(statusDisplay, 'Envoi du message...', 'blue');

        try {
            // Appel vers le point d'entrée PHP (au lieu de localhost:3000)
            const response = await fetch('api/contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                displayStatus(statusDisplay, 'Message envoyé avec succès !', 'green');
                contactForm.reset();
            } else {
                displayStatus(statusDisplay, `Erreur : ${result.error || 'Serveur indisponible'}`, 'red');
            }
        } catch (error) {
            console.error('Erreur technique :', error);
            displayStatus(statusDisplay, 'Impossible de joindre le serveur.', 'red');
        }
    });
}

/**
 * Utilitaire de mise à jour de l'interface utilisateur
 */
function displayStatus(element, message, color) {
    if (!element) return;
    element.textContent = message;
    element.style.color = color;
}