document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        } else {
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize navbar state on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 3. Smooth Scrolling for anchor links (fallback/custom behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Accordion Functionality for FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Close other open items
            const currentItem = header;

            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== currentItem) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current item
            currentItem.classList.toggle('active');
            const content = currentItem.nextElementSibling;

            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 5. Advanced Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation triggers once
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Stagger Animations for groups
    const staggerGroups = document.querySelectorAll('.stagger-animate');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150); // 150ms stagger
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerGroups.forEach(group => {
        staggerObserver.observe(group);
    });

    // Simulate slight parallax on hero image & background elements
    const heroSection = document.querySelector('.hero-section');
    const floatingElements = document.querySelectorAll('.floating-diya, .petal, .floating-gada');

    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (scroll < window.innerHeight) {
            if (heroSection) {
                // Background image parallax
                heroSection.style.backgroundPositionY = `${scroll * 0.5}px`;
            }

            // Floating elements gentle parallax
            floatingElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                el.style.transform = `translateY(${scroll * speed}px)`;
            });
        }
    });

    // 6. Audio Player Logic for Hanuman Chalisa
    const chalisaAudio = document.getElementById('chalisa-audio');
    const playBtn = document.getElementById('play-chalisa-btn');

    if (chalisaAudio && playBtn) {
        // lower volume slightly for background feel
        chalisaAudio.volume = 0.6;

        playBtn.addEventListener('click', () => {
            if (chalisaAudio.paused) {
                chalisaAudio.play().then(() => {
                    playBtn.innerHTML = '<i class="fa-solid fa-pause me-2"></i> रोकें (Pause)';
                    playBtn.classList.add('playing');
                }).catch(e => console.log("Audio play prevented:", e));
            } else {
                chalisaAudio.pause();
                playBtn.innerHTML = '<i class="fa-solid fa-play me-2"></i> चालीसा सुनें (Play/Pause)';
                playBtn.classList.remove('playing');
            }
        });
    }
});
