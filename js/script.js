/* ============================================
   Abhishek Kumar Portfolio - JavaScript
   Iron Man Arc Reactor Animation
   ============================================ */

// Iron Man "J.A.R.V.I.S." boot-up sequence overlay
window.addEventListener('load', () => {
    const boot = document.createElement('div');
    boot.id = 'jarvis-boot';
    boot.innerHTML = `
        <div class="boot-inner">
            <div class="boot-arc"></div>
            <p class="boot-text">J.A.R.V.I.S. ONLINE</p>
        </div>
    `;
    document.body.appendChild(boot);

    setTimeout(() => {
        boot.classList.add('hide');
        setTimeout(() => boot.remove(), 800);
    }, 1800);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    observer.observe(el);
});

// Hero Typing Effect
const roles = ['Web Developer', 'Frontend Designer', 'PHP Developer','Python Developer'];
const roleElement = document.querySelector('.hero-role');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    const typedText = currentRole.substring(0, charIndex);
    roleElement.textContent = typedText;

    let speed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// Start typing effect only if the element exists
if (roleElement) {
    // Remove the static cursor we'll use CSS ::after for
    typeEffect();
}

// Contact form handler
function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // Build mailto link
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailtoLink = `mailto:abhishek850687@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    // Reset form
    event.target.reset();
}

// Add scroll shadow to header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animated Counter for Hero Stats
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            const duration = 1500;
            const start = 0;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                entry.target.textContent = Math.floor(eased * (target - start) + start);
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

statNums.forEach(num => {
    counterObserver.observe(num);
});
