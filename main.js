document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const desktopDots = document.querySelector('.desktop-dots');
    const tabletDots = document.querySelector('.tablet-dots');
    const mobileDots = document.querySelector('.mobile-dots');
    
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 seconds
    let visibleCards = 1; // Will be updated based on screen size
    let isAnimating = false;
    
    // Initialize based on screen size
    updateResponsiveSettings();
    
    // Set initial position
    updateSlider();
    
    // Auto slide
    startSlideInterval();
    
    // Pause on hover
    const container = document.querySelector('.testimonials-container');
    container.addEventListener('mouseenter', pauseSlideInterval);
    container.addEventListener('mouseleave', startSlideInterval);
    
    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        if (!isAnimating) {
            navigate(-1);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (!isAnimating) {
            navigate(1);
        }
    });
    
    // Dot navigation for desktop (3 cards)
    desktopDots.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            if (!isAnimating) {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                goToSlide(targetIndex * 3); // Multiply by 3 as each dot represents 3 cards
            }
        });
    });
    
    // Dot navigation for tablet (2 cards)
    tabletDots.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            if (!isAnimating) {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                goToSlide(targetIndex * 2); // Multiply by 2 as each dot represents 2 cards
            }
        });
    });
    
    // Dot navigation for mobile (1 card)
    mobileDots.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            if (!isAnimating) {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                goToSlide(targetIndex);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!isAnimating) {
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            }
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        updateResponsiveSettings();
        updateSlider();
    });
    
    function updateResponsiveSettings() {
        const width = window.innerWidth;
        
        if (width >= 1024) {
            // Desktop - show 3 cards
            visibleCards = 3;
            desktopDots.style.display = 'flex';
            tabletDots.style.display = 'none';
            mobileDots.style.display = 'none';
        } else if (width >= 640) {
            // Tablet - show 2 cards
            visibleCards = 2;
            desktopDots.style.display = 'none';
            tabletDots.style.display = 'flex';
            mobileDots.style.display = 'none';
        } else {
            // Mobile - show 1 card
            visibleCards = 1;
            desktopDots.style.display = 'none';
            tabletDots.style.display = 'none';
            mobileDots.style.display = 'flex';
        }
    }
    
    function navigate(direction) {
        let newIndex;
        
        if (direction > 0) {
            // Next
            newIndex = currentIndex + visibleCards;
            if (newIndex >= testimonials.length) {
                newIndex = 0;
            }
        } else {
            // Previous
            newIndex = currentIndex - visibleCards;
            if (newIndex < 0) {
                newIndex = testimonials.length - visibleCards;
                if (newIndex < 0) newIndex = 0;
            }
        }
        
        goToSlide(newIndex);
        resetSlideInterval();
    }
    
    function goToSlide(index) {
        isAnimating = true;
        currentIndex = index;
        updateSlider();
        
        // Reset animation lock after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 700); // Match this with the CSS transition duration
    }
    
    function updateSlider() {
        // Calculate the transform value based on current index
        const transformValue = -(currentIndex * (100 / visibleCards));
        slider.style.transform = `translateX(${transformValue}%)`;
        
        // Update dots based on visible cards
        if (visibleCards === 3) {
            // Desktop - 2 dots for 6 cards (3 cards per dot)
            const activeDotIndex = Math.floor(currentIndex / 3);
            desktopDots.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        } else if (visibleCards === 2) {
            // Tablet - 3 dots for 6 cards (2 cards per dot)
            const activeDotIndex = Math.floor(currentIndex / 2);
            tabletDots.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        } else {
            // Mobile - 6 dots for 6 cards (1 card per dot)
            mobileDots.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            if (!isAnimating) {
                navigate(1); // Auto-advance to next slide
            }
        }, slideDuration);
    }
    
    function pauseSlideInterval() {
        clearInterval(slideInterval);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
});
