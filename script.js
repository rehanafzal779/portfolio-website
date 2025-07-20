// Enhanced Mobile Navigation with 3D Effects
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    // Animate each nav item with staggered 3D effect
    navItems.forEach((item, index) => {
        if (navLinks.classList.contains('active')) {
            item.style.transform = 'rotateY(0deg) translateX(0)';
            item.style.opacity = '1';
            item.style.transition = `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, opacity 0.3s ease ${index * 0.1}s`;
        } else {
            item.style.transform = 'rotateY(90deg) translateX(-20px)';
            item.style.opacity = '0';
        }
    });
});

// Close mobile menu when clicking on a link with bounce effect
navItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }, 200);
    });
});

// Theme Toggle with 3D Flip Animation
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.style.transform = 'rotate(180deg)';
    }
}

themeToggle.addEventListener('click', () => {
    // 3D flip animation
    themeToggle.style.transform = 'rotateY(90deg)';
    themeToggle.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    setTimeout(() => {
        if (document.documentElement.getAttribute('data-theme')) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.style.transform = 'rotate(180deg)';

        // Add glow effect
        themeToggle.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.7)';
        setTimeout(() => {
            themeToggle.style.boxShadow = 'none';
        }, 1000);
    }, 200);
});

// Typing Animation with Cursor Effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = "Hi, I'm Ahmad Afzal";
    typingText.textContent = '';
    typingText.style.borderRight = '2px solid var(--primary)';

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Blinking cursor effect after typing completes
            setInterval(() => {
                typingText.style.borderRight = typingText.style.borderRight === '2px solid transparent' ?
                    '2px solid var(--primary)' : '2px solid transparent';
            }, 500);
        }
    }

    setTimeout(typeWriter, 1000);
}

// Enhanced Smooth Scrolling with Parallax Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Add click animation to button
        if (this.classList.contains('btn')) {
            this.style.transform = 'translateY(2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }

        // Calculate scroll distance with parallax effect
        const targetPosition = targetElement.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);

        // Update active nav link
        navItems.forEach(link => {
            link.classList.remove('active');
        });

        if (targetId !== '#home') {
            this.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-technologies');
    const modalLive = document.getElementById('modal-live');
    const modalCode = document.getElementById('modal-code');
    const closeBtn = document.querySelector('.close-modal');

    // Project data
    const projects = {
        stocksense: {
            title: "StockSense",
            image: "assets/projects/stocksense.png",
            description: "Inventory management system...",
            technologies: ["Inventory", "Softr"],
            live: "#",
            code: "#"
        },
        aviasales: {
            title: "AviaSales",
            image: "assets/projects/aviasales.jpg",
            description: "Ticket booking website...",
            technologies: ["WordPress", "Elementor"],
            live: "#",
            code: "#"
        },
        hotfood: {
            title: "HotFood",
            image: "assets/projects/hotfood.jpg",
            description: "Restaurant management system...",
            technologies: ["C++", "OOP"],
            live: "#",
            code: "#"
        }
    };

    // Open modal function
    function openModal(projectId) {
        const project = projects[projectId];
        if (!project) return;

        // Set content
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalDesc.textContent = project.description;

        // Clear and add technologies
        modalTech.innerHTML = '';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            modalTech.appendChild(tag);
        });

        // Set links
        modalLive.href = project.live;
        modalCode.href = project.code;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners for project buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
// Enhanced Form Validation with 3D Effects
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formMessage = document.getElementById('form-message');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    // Add 3D focus effects to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateZ(10px)';
            input.parentElement.style.boxShadow = '0 10px 25px -5px rgba(79, 70, 229, 0.3)';
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
            input.parentElement.style.boxShadow = '';
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        // const phone = document.getElementById('phone'); // optional

        const nameVal = name.value.trim();
        const emailVal = email.value.trim();
        const messageVal = message.value.trim();
        // const phoneVal = phone ? phone.value.trim() : '';

        // 1. Check for empty fields
        if (!nameVal || !emailVal || !messageVal) {
            showFormMessage('Please fill in all required fields', 'error');
            [name, email, message].forEach(input => {
                if (input.value.trim() === '') shakeInput(input);
            });
            return;
        }

        // 2. Name must contain only letters and spaces, at least 3 characters
        const namePattern = /^[A-Za-z\s]{3,}$/;
        if (!namePattern.test(nameVal)) {
            showFormMessage('Name must be at least 3 characters and contain only letters', 'error');
            shakeInput(name);
            return;
        }

        // 3. Email must contain @ and valid format
        if (!emailVal.includes('@')) {
            showFormMessage('Email must contain "@" symbol', 'error');
            shakeInput(email);
            return;
        }

        if (!isValidEmail(emailVal)) {
            showFormMessage('Please enter a valid email address', 'error');
            shakeInput(email);
            return;
        }

        // 4. Message must be at least 10 characters and not just spaces
        if (messageVal.length < 10 || messageVal === '') {
            showFormMessage('Message must be at least 10 characters long', 'error');
            shakeInput(message);
            return;
        }

        // 5. Optional: Phone number check (uncomment if needed)
        /*
        const phonePattern = /^\d{10,15}$/;
        if (phone && phoneVal && !phonePattern.test(phoneVal)) {
            showFormMessage('Phone number must be 10–15 digits', 'error');
            shakeInput(phone);
            return;
        }
        */

        // Simulate form submission
        const submitBtn = document.querySelector('.contact-form .btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Confetti animation
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, 1500);
    });

    // Email format validator
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Input shaking animation
    function shakeInput(input) {
        input.style.animation = 'shake 0.6s ease';
        setTimeout(() => {
            input.style.animation = '';
        }, 600);
    }

    function showFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        formMessage.style.animation = 'fadeInUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

        setTimeout(() => {
            formMessage.style.animation = 'none';
        }, 400);

        setTimeout(() => {
            formMessage.style.animation = 'fadeOut 0.4s ease-out';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 400);
        }, 5000);
    }
}

// Enhanced Scroll Animation with Intersection Observer
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateZ(0)';

            // Add active class to corresponding nav link
            const id = entry.target.getAttribute('id');
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    observer.observe(section);
});

// Make hero section visible immediately
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0) translateZ(0)';
}

// Enhanced Header Scroll Effect with 3D
const header = document.querySelector('header');
if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0) translateZ(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.classList.add('scrolled');
            if (!navLinks.classList.contains('active')) {
                header.style.transform = 'translateY(-100%) translateZ(0)';
            }
        } else {
            // Scrolling up
            header.classList.add('scrolled');
            header.style.transform = 'translateY(0) translateZ(10px)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

// Back to Top Button with 3D Effect
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 300) {
            backToTop.classList.add('visible');
            backToTop.style.transform = 'translateZ(10px)';
        } else {
            backToTop.classList.remove('visible');
            backToTop.style.transform = '';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Add click animation
        backToTop.style.animation = 'pulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            backToTop.style.animation = 'none';
        }, 600);
    });
}

// Button Hover Effects for All Buttons with Ripple
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});
// Initialize particles with dynamic generation
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    // Create new particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;
        const colors = ['var(--primary)', 'var(--accent)', 'var(--success)', 'var(--error)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.background = color;

        particlesContainer.appendChild(particle);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();

    // Add animation to all tech tags
    document.querySelectorAll('.tech-tag').forEach((tag, index) => {
        tag.style.animation = `fadeIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s both`;
    });
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});