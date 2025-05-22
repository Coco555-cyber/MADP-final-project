document.addEventListener("DOMContentLoaded", () => {
    const slides = document.getElementById("slides");
    const slideElements = document.querySelectorAll(".slide");
    const scrollSections = document.querySelectorAll(".scroll-section");
    const highlight = document.getElementById("highlight");
    const totalSlides = slideElements.length;
    const transitionTime = 10000;
    const manualTime = 5000;
    let currentIndex = 1;
    let userPaused = false;
    let slideTimer = setInterval(nextSlide, transitionTime);

    slides.style.transition = "none";
    slides.style.transform = `translateX(-${currentIndex * 100}vw)`;

    setTimeout(() => {
        slides.style.transition = "transform 1s ease-in-out";
    }, 50);

    const firstSlideClone = slideElements[0].cloneNode(true);
    const lastSlideClone = slideElements[totalSlides - 1].cloneNode(true);

    slides.appendChild(firstSlideClone);
    slides.insertBefore(lastSlideClone, slideElements[0]);

    slides.style.transform = `translateX(-${currentIndex * 100}vw)`;

    function updateSlide(index, animate = true) {
        if (!animate) {
            slides.style.transition = "none";
        } else {
            slides.style.transition = "transform 1s ease-in-out";
        }

        slides.style.transform = `translateX(-${index * 100}vw)`;
        currentIndex = index;

        setTimeout(() => {
            slides.style.transition = "transform 1s ease-in-out";
        }, 50);

        updateScrollBar();
    }

    function nextSlide() {
        currentIndex++;
        updateSlide(currentIndex);

        setTimeout(() => {
            if (currentIndex >= totalSlides + 1) {
                slides.style.transition = "none";
                updateSlide(1, false);
            }
        }, 1000);
    }

    function prevSlide() {
        currentIndex--;
        updateSlide(currentIndex);

        setTimeout(() => {
            if (currentIndex <= 0) {
                slides.style.transition = "none";
                updateSlide(totalSlides, false);
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(slideTimer);
        userPaused = true;
        slideTimer = setTimeout(() => {
            userPaused = false;
            slideTimer = setInterval(nextSlide, transitionTime);
        }, manualTime);
    }

    function updateScrollBar() {
        const scrollBarWidth = document.getElementById("scroll-bar").clientWidth;
        const highlightWidth = scrollBarWidth / totalSlides;
        let adjustedIndex = (currentIndex - 1) % totalSlides; 
        
        if (currentIndex === 0) {
            adjustedIndex = totalSlides - 1;
        }
    
        highlight.style.width = `${highlightWidth}px`;
        highlight.style.transform = `translateX(${adjustedIndex * highlightWidth}px)`;
    }
    

    document.getElementById("prev").addEventListener("click", () => {
        prevSlide();
        resetTimer();
    });

    document.getElementById("next").addEventListener("click", () => {
        nextSlide();
        resetTimer();
    });

    scrollSections.forEach((section, index) => {
        section.addEventListener("click", () => {
            updateSlide(index + 1);
            resetTimer();
        });
    });

    updateScrollBar();

    const learnLinks = document.querySelectorAll(".learn");

    learnLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            clearInterval(slideTimer);
            userPaused = true;
        });

        link.addEventListener("mouseleave", () => {
            if (userPaused) {
                userPaused = false;
                slideTimer = setInterval(nextSlide, transitionTime);
            }
        });
    });

    const progressBar = document.getElementById("progress");

    window.addEventListener("scroll", () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        let scrollPercentage = (scrollTop / maxScroll) * 100;

        progressBar.style.width = scrollPercentage + "%";
    });

    const gradientOverlay = document.getElementById("gradient-overlay");
    let gradientAngle = 0;

    function rotateGradient() {
        gradientAngle = (gradientAngle + 1) % 360;
        gradientOverlay.style.background = `linear-gradient(${gradientAngle}deg, #94D3F8FF, #F6D6FFFF)`;
    }

    setInterval(rotateGradient, 50);
});
