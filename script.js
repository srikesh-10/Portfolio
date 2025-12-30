// DOM Elements
const typingText = document.getElementById('typing-text');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Typing Effect
const words = ["Programmer", "Student", "Problem Solver", "Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 200;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 100;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 200;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing on load
document.addEventListener('DOMContentLoaded', type);

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Simple mobile menu styling injection for toggle
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
        navLinks.style.padding = '2rem';
        navLinks.style.textAlign = 'center';
    } else {
        navLinks.style.display = ''; // Reset to CSS
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navLinks.style.display = '';
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// General Scroll Reveal (Title, About)
// General Scroll Reveal (Title, About, Experience)
document.querySelectorAll('.about-grid, .section-title, .experience-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Staggered Animation for Skills
const skillCards = document.querySelectorAll('.skill-card');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-card');
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

skillCards.forEach((card, index) => {
    // Alternate sides: even = left, odd = right
    if (index % 2 === 0) {
        card.classList.add('hidden-left');
    } else {
        card.classList.add('hidden-right');
    }
    // Remove previous inline styles if any
    card.style.opacity = '';
    card.style.transform = '';
    card.style.transition = '';

    skillsObserver.observe(card);
});

// Add css class for animation dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
