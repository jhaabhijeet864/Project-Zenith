// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations
    initNavbarAnimations();
    initHeroAnimations();
    initButtonAnimations();
    initScrollTriggeredAnimations();
    initMobileMenu();
    initCounterAnimations();
    initProgressBars();
    initFloatingElements();
    initParallaxEffects();

    // Navbar slide-in animation on page load
    function initNavbarAnimations() {
        const navbar = document.querySelector('.navbar');
        const navItems = document.querySelectorAll('.nav-item');
        const navCta = document.querySelector('.nav-cta');
        const logo = document.querySelector('.nav-logo');

        // Create timeline for navbar entrance
        const navTimeline = gsap.timeline();

        // Navbar slides down from top
        navTimeline.to(navbar, {
            duration: 1,
            y: 0,
            ease: "power3.out",
            delay: 0.5
        });

        // Logo animation
        navTimeline.from(logo, {
            duration: 0.8,
            scale: 0,
            rotation: -180,
            ease: "back.out(1.7)"
        }, "-=0.5");

        // Stagger nav items
        navTimeline.to(navItems, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.3");

        // CTA button
        navTimeline.to(navCta, {
            duration: 0.8,
            opacity: 1,
            x: 0,
            ease: "power2.out"
        }, "-=0.4");
    }

    // Hero section animations
    function initHeroAnimations() {
        const heroTimeline = gsap.timeline({ delay: 1.8 });

        // Hero title with glitch effect enhancement
        heroTimeline.from('.glitch-text', {
            duration: 1.2,
            scale: 0.5,
            opacity: 0,
            rotationX: 90,
            ease: "power3.out"
        });

        // Tagline
        heroTimeline.from('.tagline', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5");

        // Subtitle
        heroTimeline.from('.subtitle', {
            duration: 1,
            y: 40,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3");

        // Description
        heroTimeline.from('.description', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3");

        // Features stagger
        heroTimeline.from('.feature', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.5");

        // CTA section
        heroTimeline.from('.cta-section', {
            duration: 1,
            scale: 0.9,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3");

        // Floating background shapes
        heroTimeline.from('.floating-shape', {
            duration: 2,
            scale: 0,
            rotation: 180,
            opacity: 0,
            stagger: 0.3,
            ease: "back.out(1.7)"
        }, "-=1");
    }

    // Button hover pulse animations
    function initButtonAnimations() {
        // All buttons with pulse effect
        const buttons = document.querySelectorAll('.cta-button, .nav-btn, .price-btn');
        
        buttons.forEach(button => {
            button.classList.add('pulse-btn');
            
            button.addEventListener('mouseenter', function() {
                // Pulse animation
                gsap.to(this, {
                    duration: 0.1,
                    scale: 1.05,
                    ease: "power2.out"
                });
                
                // Ripple effect
                this.classList.add('pulse');
                
                // Glow effect
                gsap.to(this, {
                    duration: 0.3,
                    boxShadow: "0 15px 35px rgba(0, 255, 136, 0.6)",
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    boxShadow: "0 10px 25px rgba(0, 255, 136, 0.3)",
                    ease: "power2.out"
                });
                
                // Remove ripple
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 600);
            });

            // Click animation
            button.addEventListener('click', function() {
                gsap.to(this, {
                    duration: 0.1,
                    scale: 0.95,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            });
        });

        // Special feature card hover animations
        const featureCards = document.querySelectorAll('.feature');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    rotationY: 5,
                    scale: 1.02,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    rotationY: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });
    }

    // Scroll-triggered animations for sections
    function initScrollTriggeredAnimations() {
        
        // How It Works Section
        gsap.from('#how-it-works .section-title', {
            duration: 1,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#how-it-works',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from('#how-it-works .step', {
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#how-it-works .steps',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Demo Section
        const demoTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#demo',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        demoTimeline.from('#demo .section-title', {
            duration: 1,
            opacity: 0,
            ease: "power2.out"
        });

        demoTimeline.from('.predictor-left', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5");

        demoTimeline.from('.predictor-center', {
            duration: 1.2,
            scale: 0.5,
            rotation: 180,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.8");

        demoTimeline.from('.predictor-right', {
            duration: 1,
            x: 100,
            opacity: 0,
            ease: "power2.out"
        }, "-=1");

        // Statistics Section
        gsap.from('#statistics .section-title', {
            duration: 1,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#statistics',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from('#statistics .stat', {
            duration: 0.8,
            scale: 0.5,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '#statistics .stats-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Testimonials Section
        const testimonialsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#testimonials',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        testimonialsTimeline.from('#testimonials .section-title', {
            duration: 1,
            opacity: 0,
            ease: "power2.out"
        });

        testimonialsTimeline.from('.testimonial', {
            duration: 1,
            rotationY: 90,
            opacity: 0,
            stagger: 0.3,
            ease: "power2.out"
        }, "-=0.5");

        // Pricing Section
        const pricingTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#pricing',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        pricingTimeline.from('#pricing .section-title', {
            duration: 1,
            opacity: 0,
            ease: "power2.out"
        });

        pricingTimeline.from('.price-card', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");

        // FAQ Section
        gsap.from('.faq .section-title', {
            duration: 1,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.faq',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.from('.faq-item', {
            duration: 0.8,
            x: -50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.faq-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Animated counters
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.animated-counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => {
                    gsap.to({val: 0}, {
                        duration: 2,
                        val: target,
                        ease: "power2.out",
                        onUpdate: function() {
                            counter.textContent = Math.round(this.targets()[0].val) + suffix;
                        }
                    });
                }
            });
        });
    }

    // Progress bar animations
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach(bar => {
            const progress = bar.dataset.progress;
            
            ScrollTrigger.create({
                trigger: bar,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(bar, {
                        duration: 1.5,
                        scaleX: progress / 100,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // Floating elements continuous animation
    function initFloatingElements() {
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            gsap.to(shape, {
                duration: 4 + index,
                y: "+=30",
                rotation: "+=360",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.5
            });
        });

        // Feature icons floating
        const featureIcons = document.querySelectorAll('.feature-icon');
        featureIcons.forEach((icon, index) => {
            gsap.to(icon, {
                duration: 3 + index * 0.5,
                y: "+=10",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.8
            });
        });
    }

    // Parallax effects
    function initParallaxEffects() {
        // Parallax background elements
        gsap.to('.floating-shape', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Section backgrounds parallax
        gsap.utils.toArray('section').forEach(section => {
            gsap.to(section, {
                backgroundPositionY: "50%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Add loading animation
    function initLoadingAnimation() {
        gsap.set('body', { opacity: 0 });
        
        gsap.to('body', {
            duration: 1,
            opacity: 1,
            ease: "power2.out",
            delay: 0.2
        });
    }

    // Initialize loading animation
    initLoadingAnimation();

    // Enhanced scroll-triggered animations with more complex effects
    function initAdvancedScrollAnimations() {
        // Reveal animation for cards
        gsap.utils.toArray('.feature, .testimonial, .price-card, .stat').forEach(card => {
            gsap.from(card, {
                duration: 1,
                y: 100,
                opacity: 0,
                scale: 0.8,
                rotation: 5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Text reveal animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                duration: 1.2,
                opacity: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // Initialize advanced animations
    initAdvancedScrollAnimations();

    // Cursor follow effect for interactive elements
    function initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                duration: 0.2,
                x: e.clientX,
                y: e.clientY,
                ease: "power2.out"
            });
        });

        // Add cursor styles
        const cursorStyles = `
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: rgba(0, 255, 136, 0.3);
                border: 2px solid #00ff88;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                mix-blend-mode: difference;
                transform: translate(-50%, -50%);
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = cursorStyles;
        document.head.appendChild(styleSheet);
    }

    // Initialize cursor effects for desktop
    if (window.innerWidth > 768) {
        initCursorEffects();
    }

    // Console message for developers
    console.log('🚀 Zenith animations initialized with GSAP!');
    console.log('✨ Features: Navbar slide-in, button pulse, scroll-triggered fade-ins');
});

// Additional utility functions
function animateOnHover(element, options = {}) {
    const defaults = {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
    };
    const settings = { ...defaults, ...options };
    
    element.addEventListener('mouseenter', () => {
        gsap.to(element, settings);
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            scale: 1,
            duration: settings.duration,
            ease: settings.ease
        });
    });
}

// Export for potential use in other scripts
window.ZenithAnimations = {
    animateOnHover,
    initNavbarAnimations,
    initScrollTriggeredAnimations
};
