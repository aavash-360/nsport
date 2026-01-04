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
        themeIcon.src = 'assets/party-logo.png';
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

// Election Countdown Timer
function startCountdown() {
    const electionDate = new Date('2026-03-05T00:00:00').getTime();
    const electionEndDate = new Date('2026-03-06T00:00:00').getTime(); // End of election day
    const countdownDisplay = document.getElementById('countdown-timer');
    const countdownTitle = document.querySelector('.countdown-title');
    const countdownCTA = document.querySelector('.countdown-cta');

    if (!countdownDisplay) return;

    function toNepaliDigits(str) {
        const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return str.toString().split('').map(d => nepaliNumerals[d] || d).join('');
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = electionDate - now;
        const distanceFromEnd = electionEndDate - now;
        const currentLang = localStorage.getItem('preferred-lang') || 'ne';

        // Check if it's ELECTION DAY (March 5, 2026)
        if (distance < 0 && distanceFromEnd > 0) {
            // ... (keep existing election day logic, just updating time display) ...
            // IT'S ELECTION DAY!
            const currentDate = new Date();
            // ... (Title/CTA updates omitted for brevity, logic remains or update via innerHTML if needed, relying on data attributes from HTML generally) ...
            // Update title - URGENT MESSAGE
            countdownTitle.setAttribute('data-en', '🗳️ TODAY IS ELECTION DAY! 🗳️');
            countdownTitle.setAttribute('data-ne', '🗳️ आज चुनाव दिन हो! 🗳️');
            countdownTitle.textContent = currentLang === 'en' ? '🗳️ TODAY IS ELECTION DAY! 🗳️' : '🗳️ आज चुनाव दिन हो! 🗳️';
            countdownTitle.style.color = 'var(--secondary-color)';
            countdownTitle.style.fontSize = '1.2rem';
            countdownTitle.style.animation = 'pulse 1.5s ease-in-out infinite';

            // Update CTA - URGENT CALL TO ACTION
            countdownCTA.setAttribute('data-en', '⚡ VOTE NOW! YOUR VOICE MATTERS! ⚡');
            countdownCTA.setAttribute('data-ne', '⚡ अहिले मतदान गर्नुहोस्! तपाईंको आवाज महत्त्वपूर्ण छ! ⚡');
            countdownCTA.textContent = currentLang === 'en' ? '⚡ VOTE NOW! YOUR VOICE MATTERS! ⚡' : '⚡ अहिले मतदान गर्नुहोस्! तपाईंको आवाज महत्त्वपूर्ण छ! ⚡';
            countdownCTA.style.fontSize = '1.1rem';
            countdownCTA.style.animation = 'pulse 1s ease-in-out infinite';

            // Calculate time remaining in the day
            const endOfDay = new Date('2026-03-06T00:00:00').getTime();
            const timeLeft = endOfDay - now;
            const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Display time remaining to vote today
            let dStr = '00';
            let hStr = String(hoursLeft).padStart(2, '0');
            let mStr = String(minutesLeft).padStart(2, '0');
            let sStr = String(secondsLeft).padStart(2, '0');

            if (currentLang === 'ne') {
                dStr = toNepaliDigits(dStr);
                hStr = toNepaliDigits(hStr);
                mStr = toNepaliDigits(mStr);
                sStr = toNepaliDigits(sStr);
            }

            document.getElementById('days').textContent = dStr;
            document.getElementById('hours').textContent = hStr;
            document.getElementById('minutes').textContent = mStr;
            document.getElementById('seconds').textContent = sStr;

            // Update labels to show "Time Left to Vote"
            document.querySelector('#days').nextElementSibling.setAttribute('data-en', 'Day');
            document.querySelector('#days').nextElementSibling.setAttribute('data-ne', 'दिन');
            document.querySelector('#hours').nextElementSibling.setAttribute('data-en', 'Hours');
            document.querySelector('#hours').nextElementSibling.setAttribute('data-ne', 'घण्टा');
            document.querySelector('#minutes').nextElementSibling.setAttribute('data-en', 'Minutes');
            document.querySelector('#minutes').nextElementSibling.setAttribute('data-ne', 'मिनेट');
            document.querySelector('#seconds').nextElementSibling.setAttribute('data-en', 'Seconds');
            document.querySelector('#seconds').nextElementSibling.setAttribute('data-ne', 'सेकेन्ड');

            // Update labels text immediately
            document.querySelectorAll('.time-label').forEach(el => {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            });

            return;
        }

        // Check if election has passed (after March 5, 2026)
        if (distanceFromEnd < 0) {
            // Show current date and time instead
            const currentDate = new Date();

            // Update title
            countdownTitle.setAttribute('data-en', 'Current Date & Time');
            countdownTitle.setAttribute('data-ne', 'हालको मिति र समय');
            countdownTitle.textContent = currentLang === 'en' ? 'Current Date & Time' : 'हालको मिति र समय';
            countdownTitle.style.color = 'var(--primary-color)';
            countdownTitle.style.fontSize = '1rem';
            countdownTitle.style.animation = 'none';

            // Update CTA
            countdownCTA.setAttribute('data-en', 'Thank you for your support!');
            countdownCTA.setAttribute('data-ne', 'तपाईंको समर्थनको लागि धन्यवाद!');
            countdownCTA.textContent = currentLang === 'en' ? 'Thank you for your support!' : 'तपाईंको समर्थनको लागि धन्यवाद!';
            countdownCTA.style.fontSize = '0.9rem';
            countdownCTA.style.animation = 'pulse 2s ease-in-out infinite';

            // Display current time in the countdown boxes
            let hours = String(currentDate.getHours()).padStart(2, '0');
            let minutes = String(currentDate.getMinutes()).padStart(2, '0');
            let seconds = String(currentDate.getSeconds()).padStart(2, '0');
            let day = String(currentDate.getDate()).padStart(2, '0');

            if (currentLang === 'ne') {
                hours = toNepaliDigits(hours);
                minutes = toNepaliDigits(minutes);
                seconds = toNepaliDigits(seconds);
                day = toNepaliDigits(day);
            }

            document.getElementById('days').textContent = day;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;

            // Update labels
            document.querySelector('#days').nextElementSibling.setAttribute('data-en', 'Day');
            document.querySelector('#days').nextElementSibling.setAttribute('data-ne', 'दिन');
            document.querySelector('#hours').nextElementSibling.setAttribute('data-en', 'Hour');
            document.querySelector('#hours').nextElementSibling.setAttribute('data-ne', 'घण्टा');
            document.querySelector('#minutes').nextElementSibling.setAttribute('data-en', 'Min');
            document.querySelector('#minutes').nextElementSibling.setAttribute('data-ne', 'मिनेट');
            document.querySelector('#seconds').nextElementSibling.setAttribute('data-en', 'Sec');
            document.querySelector('#seconds').nextElementSibling.setAttribute('data-ne', 'सेकेन्ड');

            // Update labels text immediately
            document.querySelectorAll('.time-label').forEach(el => {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            });

            return;
        }

        // Normal countdown (before election day)
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let dStr = String(days).padStart(2, '0');
        let hStr = String(hours).padStart(2, '0');
        let mStr = String(minutes).padStart(2, '0');
        let sStr = String(seconds).padStart(2, '0');

        if (currentLang === 'ne') {
            dStr = toNepaliDigits(dStr);
            hStr = toNepaliDigits(hStr);
            mStr = toNepaliDigits(mStr);
            sStr = toNepaliDigits(sStr);
        }

        // Update display with leading zeros
        document.getElementById('days').textContent = dStr;
        document.getElementById('hours').textContent = hStr;
        document.getElementById('minutes').textContent = mStr;
        document.getElementById('seconds').textContent = sStr;
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start countdown when page loads
startCountdown();

// Preloader hide on full load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

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