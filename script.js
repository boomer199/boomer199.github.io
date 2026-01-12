/**
 * MINIMAL PORTFOLIO — JavaScript
 * Scroll-triggered animations using Intersection Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
});

/**
 * Initialize scroll-triggered reveal animations
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const revealElements = document.querySelectorAll('.reveal, .reveal-up');
    
    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Subtle parallax effect on scroll
 */
function initParallax() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;
                const opacity = 1 - (scrolled / 600);
                
                if (heroTitle) {
                    heroTitle.style.transform = `translateY(${rate}px)`;
                    heroTitle.style.opacity = Math.max(opacity, 0);
                }
                
                if (heroSubtitle) {
                    heroSubtitle.style.transform = `translateY(${rate * 0.5}px)`;
                    heroSubtitle.style.opacity = Math.max(opacity, 0);
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/**
 * Optional: Magnetic cursor effect for links
 * Uncomment to enable
 */
/*
function initMagneticCursor() {
    const magneticElements = document.querySelectorAll('.nav-links a, .social-link');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}
*/

/**
 * Optional: Text split animation utility
 * Use for more complex text reveals
 */
function splitText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.setProperty('--char-index', i);
        span.classList.add('char');
        element.appendChild(span);
    });
}

/**
 * Optional: Stagger animation for multiple elements
 */
function staggerReveal(elements, delay = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * delay);
    });
}

/**
 * Page transition helper (if using Swup or Barba.js)
 */
function initPageTransitions() {
    document.documentElement.classList.add('is-rendered');
    
    // Add loading state removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// Initialize page transitions
initPageTransitions();

