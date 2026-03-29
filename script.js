// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');

        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active')) {
            // Check if click is outside nav-links and mobile button
            if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Prevent clicks inside nav-links from closing the menu
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Hero Slider Functionality
const initHeroSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (!sliderContainer || slides.length === 0) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    const totalSlides = slides.length;
    const slideInterval = 4000; // 4 seconds per slide
    
    const updateSlider = () => {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    };
    
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    };
    
    const goToSlide = (index) => {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    };
    
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    };
    
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Pause on hover
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        heroImage.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Start the slider
    startAutoSlide();
};

// Initialize hero slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
    initHeroSlider();
}

// Smooth Scrolling
// Smooth Scrolling & Mobile Menu Close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Allow default anchor click behavior to use CSS scroll-behavior

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Language Toggle with Sliding Switch
const langSwitch = document.getElementById('lang-switch');
const translatableElements = document.querySelectorAll('[data-en]');

function updateLanguage(lang) {
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update switch state (checked = NE, unchecked = EN)
    if (langSwitch) {
        langSwitch.checked = (lang === 'ne');
    }

    // Save preference
    localStorage.setItem('preferred-lang', lang);
}

// Listen to toggle switch changes
if (langSwitch) {
    langSwitch.addEventListener('change', () => {
        const lang = langSwitch.checked ? 'ne' : 'en';
        updateLanguage(lang);
    });
}

// Load saved language (default to Nepali)
const savedLang = localStorage.getItem('preferred-lang') || 'ne';
updateLanguage(savedLang);


// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('img'); // Now selecting img

function updateTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        // In Dark Mode, show Unlit Bulb
        themeIcon.src = 'assets/party-logo-off.png';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        // In Light Mode, show Lit Bulb
        themeIcon.src = 'assets/party-logoooo.png';
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark-mode');
    updateTheme(isDark);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    updateTheme(true);
}

// YouTube Facade - Open in new tab
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function () {
        const embedSrc = this.getAttribute('data-src');
        if (embedSrc) {
            // Extract video ID from embed URL
            const videoIdMatch = embedSrc.match(/\/embed\/([^?]+)/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1];
                // Extract start time if present
                const startMatch = embedSrc.match(/start=(\d+)/);
                const startParam = startMatch ? `&t=${startMatch[1]}s` : '';
                // Create proper watch URL
                const watchUrl = `https://www.youtube.com/watch?v=${videoId}${startParam}`;
                window.open(watchUrl, '_blank');
            }
        }
    });
});

// 3D Tilt Effect
document.querySelectorAll('.video-card, .gallery-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Refined Scroll Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible for performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add stagger effect to cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.video-card, .gallery-item, .cv-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});
// Logo Interaction
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        // Optional: Prevent default jump behavior if you want purely animation first
        // e.preventDefault(); 

        logo.classList.add('animate-click');

        // Remove class after animation completes to allow re-triggering
        logo.addEventListener('animationend', () => {
            logo.classList.remove('animate-click');
        }, { once: true });
    });
}
// Hero Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));

    // Handle wrap-around
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoPlay();
}

// Auto Play
let slideInterval;

function startAutoPlay() {
    slideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000); // Change every 5 seconds
}

function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
}

// Initialize
if (slides.length > 0) {
    showSlide(0);
    startAutoPlay();
}

// -- Mini Slider Logic (Replaces Hero Slider) --
const miniSliderImages = document.querySelectorAll('.mini-slider img');
let miniSliderIndex = 0;

function startMiniSlider() {
    if (miniSliderImages.length === 0) return;

    setInterval(() => {
        // Remove active class from current
        miniSliderImages[miniSliderIndex].classList.remove('active');

        // Increment index
        miniSliderIndex = (miniSliderIndex + 1) % miniSliderImages.length;

        // Add active class to next
        miniSliderImages[miniSliderIndex].classList.add('active');
    }, 4000); // Change image every 4 seconds
}

// Initial Call
startMiniSlider();

// See More Videos Functionality
const seeMoreBtn = document.getElementById('see-more-videos');
if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
        const videoGrid = document.querySelector('.video-grid');
        const isExpanded = seeMoreBtn.getAttribute('data-expanded') === 'true';

        if (isExpanded) {
            // Collapse
            videoGrid.classList.remove('expanded');
            seeMoreBtn.setAttribute('data-en', 'See More Videos');
            seeMoreBtn.setAttribute('data-ne', 'थप भिडियो हेर्नुहोस्');
            seeMoreBtn.setAttribute('data-expanded', 'false');
        } else {
            // Expand
            videoGrid.classList.add('expanded');
            seeMoreBtn.setAttribute('data-en', 'See Less Videos');
            seeMoreBtn.setAttribute('data-ne', 'भिडियो लुकाउनुहोस्');
            seeMoreBtn.setAttribute('data-expanded', 'true');
        }

        // Apply language update immediately
        const currentLang = localStorage.getItem('preferred-lang') || 'ne';
        if (typeof updateLanguage === 'function') {
            updateLanguage(currentLang);
        }
    });
}

// Hero Section logic is now primarily CSS-based or handled via global initializers.
// Any future interactive logic for the Vision card can be added here.

// Preloader hide on full load or max 2.5s timeout
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
    }
};

window.addEventListener('load', hidePreloader);
// Fallback timeout: Ensure preloader goes away even if some assets hang
setTimeout(hidePreloader, 2500);

// Scroll-to-top button logic
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}