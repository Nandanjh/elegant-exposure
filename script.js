// Elegant Exposure - Kolkata Photography
// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Video sound toggle
    const videoElement = document.querySelector('.video-container video');
    const soundToggleBtn = document.querySelector('.sound-toggle');
    
    if (videoElement && soundToggleBtn) {
        // Set video muted by default
        videoElement.muted = true;
        
        soundToggleBtn.addEventListener('click', function() {
            videoElement.muted = !videoElement.muted;
            
            // Update icon based on mute state
            if (videoElement.muted) {
                soundToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                soundToggleBtn.setAttribute('title', 'Unmute');
            } else {
                soundToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                soundToggleBtn.setAttribute('title', 'Mute');
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    if (dots.length > 0 && prevBtn && nextBtn) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        // Auto slide change
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                valid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                valid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value)) {
                valid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                valid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }
            
            if (valid) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.display = 'block';
        errorElement.style.marginTop = '5px';
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            formGroup.removeChild(existingError);
        }
        
        formGroup.appendChild(errorElement);
        input.style.borderColor = '#ff6b6b';
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            formGroup.removeChild(existingError);
        }
        input.style.borderColor = '';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Portfolio page functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Lightbox gallery
    const galleryButtons = document.querySelectorAll('.view-gallery');
    const lightbox = document.querySelector('.lightbox-container');
    const lightboxTitle = document.querySelector('.gallery-title');
    const galleryContainer = document.querySelector('.gallery-container');
    const closeButton = document.querySelector('.close-lightbox');
    const prevImage = document.querySelector('.prev-image');
    const nextImage = document.querySelector('.next-image');
    const imageCounter = document.querySelector('.image-counter');
    
    let currentGallery = [];
    let currentImageIndex = 0;

    // Gallery data - in a real application, this would come from a database or API
    const galleryData = {
        'wedding': [
            { src: '15.jpg', alt: 'Wedding Photo 1' },
            { src: '41.jpg', alt: 'Wedding Photo 2' },
            { src: '44.jpg', alt: 'Wedding Photo 3' },
            { src: 'assets/images/wedding4.jpg', alt: 'Wedding Photo 4' },
            { src: 'assets/images/wedding5.jpg', alt: 'Wedding Photo 5' }
        ],
        'pre-wedding': [
            { src: '18.jpeg.jpg', alt: 'Pre-Wedding Photo 1' },
            { src: '19.jpeg.jpg', alt: 'Pre-Wedding Photo 2' },
            { src: '34.jpg', alt: 'Pre-Wedding Photo 3' },
            { src: 'assets/images/pre-wedding4.jpg', alt: 'Pre-Wedding Photo 4' }
        ],
        'commercial': [
            { src: 'assets/images/commercial1.jpg', alt: 'Commercial Photo 1' },
            { src: 'assets/images/commercial2.jpg', alt: 'Commercial Photo 2' },
            { src: 'assets/images/commercial3.jpg', alt: 'Commercial Photo 3' }
        ],
        'conference': [
            { src: 'assets/images/conference1.jpg', alt: 'Conference Photo 1' },
            { src: 'assets/images/conference2.jpg', alt: 'Conference Photo 2' },
            { src: 'assets/images/conference3.jpg', alt: 'Conference Photo 3' }
        ],
        'birthday': [
            { src: 'assets/images/birthday1.jpg', alt: 'Birthday Photo 1' },
            { src: 'assets/images/birthday2.jpg', alt: 'Birthday Photo 2' },
            { src: 'assets/images/birthday3.jpg', alt: 'Birthday Photo 3' }
        ],
        'portrait': [
            { src: 'assets/images/portrait1.jpg', alt: 'Portrait Photo 1' },
            { src: 'assets/images/portrait2.jpg', alt: 'Portrait Photo 2' },
            { src: 'assets/images/portrait3.jpg', alt: 'Portrait Photo 3' }
        ],
        'family': [
            { src: 'assets/images/family1.jpg', alt: 'Family Photo 1' },
            { src: 'assets/images/family2.jpg', alt: 'Family Photo 2' },
            { src: 'assets/images/family3.jpg', alt: 'Family Photo 3' }
        ],
        'fashion': [
            { src: 'assets/images/fashion1.jpg', alt: 'Fashion Photo 1' },
            { src: 'assets/images/fashion2.jpg', alt: 'Fashion Photo 2' },
            { src: 'assets/images/fashion3.jpg', alt: 'Fashion Photo 3' }
        ]
    };

    // Gallery titles
    const galleryTitles = {
        'wedding': 'Wedding Photography',
        'pre-wedding': 'Pre-Wedding Shoots',
        'commercial': 'Commercial Photography',
        'conference': 'Conference & Seminars',
        'birthday': 'Birthday Celebrations',
        'portrait': 'Portrait Sessions',
        'family': 'Family Portraits',
        'fashion': 'Fashion Photography'
    };

    if (galleryButtons.length > 0 && lightbox) {
        galleryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const galleryType = button.getAttribute('data-gallery');
                openGallery(galleryType);
            });
        });

        closeButton.addEventListener('click', closeGallery);

        // Close gallery with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeGallery();
            }
        });

        // Navigate with arrow keys
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });

        prevImage.addEventListener('click', showPrevImage);
        nextImage.addEventListener('click', showNextImage);
    }

    function openGallery(galleryType) {
        if (galleryData[galleryType]) {
            currentGallery = galleryData[galleryType];
            currentImageIndex = 0;
            
            lightboxTitle.textContent = galleryTitles[galleryType] || 'Gallery';
            showImage(currentImageIndex);
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    function closeGallery() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    function showImage(index) {
        if (currentGallery.length === 0) return;
        
        const image = currentGallery[index];
        galleryContainer.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        imageCounter.textContent = `${index + 1} / ${currentGallery.length}`;
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
        showImage(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
        showImage(currentImageIndex);
    }

    // Scroll animations
    const scrollElements = document.querySelectorAll('.fade-in, .service-card, .feature, .gallery-item, .team-member, .vision-card');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100) &&
            (elementTop + elementHeight) > 0
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize scroll animations
    handleScrollAnimation();
});
