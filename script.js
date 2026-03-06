// Mobile Navigation Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

mobileMenu.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Change Icon
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('nav-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('nav-active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Accordion Logic for Parental Guidance
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    item.addEventListener('click', () => {
        // Find the paragraph within the clicked item
        const content = item.querySelector('p');

        // Check if there is already an active item, close it if it's not the clicked one
        const activeItem = document.querySelector('.accordion-item.active');
        if (activeItem && activeItem !== item) {
            activeItem.classList.remove('active');
            activeItem.querySelector('p').style.display = 'none';
        }

        // Toggle the clicked item
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
});

// Initialize accordion styles securely
document.addEventListener('DOMContentLoaded', () => {
    accordionItems.forEach((item, index) => {
        const content = item.querySelector('p');
        if (index !== 0) {
            content.style.display = 'none'; // Hide all except first by default
        } else {
            item.classList.add('active');
            content.style.display = 'block';
        }
    });
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// E-book Mobile Touch Support
const ebookItems = document.querySelectorAll('.ebook-item');

ebookItems.forEach(item => {
    item.addEventListener('click', function (e) {
        // If clicking on a button or link, let it work normally
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }

        // Apply only on mobile/tablet views where hover is tricky
        if (window.innerWidth <= 1024) {
            const isActive = this.classList.contains('active');

            // Remove active from all items first
            ebookItems.forEach(el => el.classList.remove('active'));

            // Toggle active state for this item
            if (!isActive) {
                this.classList.add('active');
            }
        }
    });
});

// Close active ebook overlay if clicking outside of any ebook
document.addEventListener('click', function (e) {
    if (window.innerWidth <= 1024) {
        if (!e.target.closest('.ebook-item')) {
            ebookItems.forEach(el => el.classList.remove('active'));
        }
    }
});
