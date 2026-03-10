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

// Fade-in Animation Observer
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
});

// Join Us Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const joinModal = document.getElementById('joinModal');
    const openJoinModalBtn = document.getElementById('openJoinModal');
    const closeModalBtn = document.querySelector('.modal-close');

    if (openJoinModalBtn && joinModal && closeModalBtn) {
        // Open modal
        openJoinModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            joinModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close modal on close button click
        closeModalBtn.addEventListener('click', () => {
            joinModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close modal on clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === joinModal) {
                joinModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        // Function to set the 'Joined' state
        const setJoinedState = () => {
            localStorage.setItem('hasJoinedLearnersGrove', 'true');
            if (openJoinModalBtn) {
                openJoinModalBtn.textContent = 'Joined ✓';
                openJoinModalBtn.classList.add('btn-joined');
                // Remove click listener functionality visually and functionally
                openJoinModalBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); };
            }
        };

        // Check Local Storage on page load
        if (localStorage.getItem('hasJoinedLearnersGrove') === 'true') {
            setJoinedState();
        }

        // Handle Facebook button click
        const facebookBtn = document.querySelector('.btn-facebook');
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                setJoinedState();
                // Close modal shortly after opening the new tab
                setTimeout(() => {
                    joinModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 1000);
            });
        }
    }

    // Handle form submission
    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const formMessage = document.getElementById('formMessage');

    // IMPORTANT: Replace this URL with your deployed Google Apps Script Web App URL!
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuMXBBOuO1vPdeDqU7Gw5ehPN7GDjth94-ve0paZtIDl0OVavoPzE1JXOPFrjOzCtt/exec';

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const nameInput = subscribeForm.querySelector('input[name="Name"]').value.trim();
            const emailInput = subscribeForm.querySelector('input[name="Email"]').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nameInput || !emailInput || !emailRegex.test(emailInput)) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#dc3545'; // Error red
                formMessage.textContent = 'Please enter a valid name and email address.';
                return;
            }

            // Show loading state
            const originalBtnText = subscribeBtn.textContent;
            subscribeBtn.textContent = 'Subscribing...';
            subscribeBtn.disabled = true;
            formMessage.style.display = 'none';

            // Send data using FormData
            const formData = new FormData(subscribeForm);

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    // If the script returned an error (e.g. duplicate email)
                    if (data.result === 'error') {
                        throw new Error(data.message);
                    }

                    // Success
                    formMessage.style.display = 'block';
                    formMessage.style.color = '#28a745'; // Success green
                    formMessage.textContent = 'Thank you for joining the Learner’s Grove community! You will receive parenting tips and kids stories soon.';
                    subscribeForm.reset();

                    // Set the joined state to update the top header button
                    if (openJoinModalBtn) {
                        localStorage.setItem('hasJoinedLearnersGrove', 'true');
                        openJoinModalBtn.textContent = 'Joined ✓';
                        openJoinModalBtn.classList.add('btn-joined');
                        openJoinModalBtn.onclick = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
                    }

                    // Optional: Auto-close modal after a few seconds
                    setTimeout(() => {
                        joinModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        formMessage.style.display = 'none';
                        subscribeBtn.textContent = originalBtnText;
                        subscribeBtn.disabled = false;
                    }, 4000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    formMessage.style.display = 'block';
                    formMessage.style.color = '#dc3545';

                    // Custom duplicate message check or generic error
                    if (error.message.includes('already subscribed')) {
                        formMessage.textContent = 'This email is already subscribed!';
                    } else {
                        formMessage.textContent = 'There was an error. Please ensure you have replaced the GOOGLE_SCRIPT_URL in script.js and try again.';
                    }
                })
                .finally(() => {
                    if (!formMessage.textContent.includes('Thank you')) {
                        subscribeBtn.textContent = originalBtnText;
                        subscribeBtn.disabled = false;
                    }
                });
        });
    }
});

// E-Book WhatsApp Purchase System
document.addEventListener('DOMContentLoaded', () => {
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    const phoneNumber = '923359170347'; // Learner's Grove Phone Number

    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Find the closest ebook container
            const ebookItem = btn.closest('.ebook-item');
            if (ebookItem) {
                // Get the title from h4 (works for both index.html and ebooks.html structures)
                let title = 'Ebook';
                const titleElement = ebookItem.querySelector('h4');
                if (titleElement) {
                    title = titleElement.innerText.trim();
                }

                // Format the message
                const message = `Hello, I would like to purchase the ebook: ${title}. Please share the payment details.`;

                // Open WhatsApp link
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
});
