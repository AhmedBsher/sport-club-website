document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // --- Global Variables --- //
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTopBtn = document.querySelector('.back-to-top');
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    let eventsGrid = document.getElementById('events-grid');
    let eventFiltersContainer = document.getElementById('event-filters');
    let coachesGrid = document.getElementById('coaches-grid');

    // --- Theme Switcher --- //
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        if (themeToggle) themeToggle.checked = savedTheme === 'dark';
    };

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Sticky Navbar & Progress Bar --- //
    const handleScroll = () => {
        // Update navbar scroll state
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Update active nav link based on scroll position
        const scrollPosition = window.scrollY + 100;
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.style.transform = 'scale(0.95)';
            }
        } else {
            navbar.classList.remove('scrolled');
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.style.transform = 'scale(1)';
            }
        }
        
        // Back to top button
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('active', window.scrollY > 300);
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- Menu Toggle Function --- //
    const toggleMenu = (forceClose = false) => {
        if (!menuToggle || !navLinks) return;
        
        const isMobile = window.innerWidth <= 992;
        const isOpening = forceClose ? false : !navLinks.classList.contains('active');
        
        if (isOpening) {
            // Opening the menu
            navLinks.style.display = 'flex';
            // Force reflow to ensure display is set before adding active class
            void navLinks.offsetHeight;
            navLinks.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Set focus to first menu item for better accessibility
            setTimeout(() => {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 50);
        } else {
            // Closing the menu
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // After transition ends, set display: none for desktop
            if (!isMobile) {
                navLinks.addEventListener('transitionend', function handler() {
                    if (!navLinks.classList.contains('active')) {
                        navLinks.style.display = 'none';
                    }
                    navLinks.removeEventListener('transitionend', handler);
                }, { once: true });
            } else {
                menuToggle.focus();
            }
        }
        
        if (isOpening) {
            // Opening the menu
            navLinks.style.display = 'flex';
            // Force reflow to ensure display is set before adding active class
            void navLinks.offsetHeight;
            navLinks.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Set focus to first menu item for better accessibility
            setTimeout(() => {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 50);
        } else {
            // Closing the menu
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // After transition ends, set display: none for desktop
            if (!isMobile) {
                navLinks.addEventListener('transitionend', function handler() {
                    if (!navLinks.classList.contains('active')) {
                        navLinks.style.display = 'none';
                    }
                    navLinks.removeEventListener('transitionend', handler);
                }, { once: true });
            } else {
                menuToggle.focus();
            }
        }
        
        // Update icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = isOpening ? 'fas fa-times' : 'fas fa-bars';
        }
        
        // Close menu when clicking outside
        if (isOpening) {
            const closeMenuOnClickOutside = (e) => {
                if (!navLinks.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                    toggleMenu(true);
                    document.removeEventListener('click', closeMenuOnClickOutside);
                }
            };
            
            // Add a small delay to prevent immediate closure
            setTimeout(() => {
                document.addEventListener('click', closeMenuOnClickOutside);
            }, 10);
        }
        
        // Handle click outside to close
        if (isOpening) {
            const closeMenuOnClickOutside = (e) => {
                if (!navLinks.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                    toggleMenu(true);
                    document.removeEventListener('click', closeMenuOnClickOutside);
                }
            };
            
            // Add a small delay to prevent immediate closure
            setTimeout(() => {
                document.addEventListener('click', closeMenuOnClickOutside);
            }, 10);
        }
    };
    
    // Close menu when clicking on nav links
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Close menu when a link is clicked
                toggleMenu(true);
                // Don't prevent default for anchor links
                if (link.getAttribute('href') === '#') {
                    return false;
                }
                toggleMenu(true);
            });
        });
    }
    
    // Initialize menu toggle button and handle responsive behavior
    if (menuToggle && navLinks) {
        // Set initial ARIA attributes
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'nav-links');
        
        // Set initial display based on screen size
        const isMobile = window.innerWidth <= 992;
        navLinks.style.display = isMobile ? 'none' : 'flex';
        
        // Track if we're on mobile
        let wasMobile = isMobile;
        
        // Handle window resize
        const handleResize = () => {
            const isMobile = window.innerWidth <= 992;
            
            if (isMobile) {
                // Mobile view
                menuToggle.style.display = 'flex';
                
                // Ensure menu is hidden by default on mobile
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            } else {
                // Desktop view - show menu toggle and reset styles
                menuToggle.style.display = 'flex';
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                // Reset menu state on desktop
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
                
                // Reset any inline styles that might affect desktop view
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.right = '';
                navLinks.style.width = '';
                navLinks.style.height = '';
                navLinks.style.background = '';
                navLinks.style.overflowY = '';
            }
            
            // Close menu when switching between mobile and desktop
            if (isMobile !== wasMobile) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
            
            wasMobile = isMobile;
        };
        
        // Handle click outside to close menu
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target) &&
                navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });
        
        // Handle Escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(true);
                menuToggle.focus();
            }
        });
        
        // Toggle menu when clicking the menu button
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Initial setup
        handleResize();
        
        // Update on window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 100);
        });
        
        // Toggle menu when clicking the menu button
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Add click event
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleMenu();
        });
        
        // Handle keyboard navigation
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            } else if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });
        
        // Close menu when clicking on nav links (for mobile)
        if (navLinks) {
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        toggleMenu(true);
                    }
                });
            });
        }
    }
    
    // Close menu when clicking on nav links
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu(true);
                }
            });
        });
    }

    // Close menu when clicking on nav links
    if (navLinks) {
        const navLinksList = Array.from(navLinks.querySelectorAll('a'));
        
        navLinksList.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // Close menu on mobile after clicking a link
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
                
                // Handle smooth scrolling for internal links
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !e.target.closest('#nav-links') && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
            
            // Reset menu on desktop
            if (window.innerWidth > 768 && navLinks) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }, 100);
    });

    // --- Smooth Scrolling --- //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#join-modal')) return; // Let modal handler take care of it
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if(targetElement){
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Back to Top Button --- //
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Observers --- //
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-img');
                observer.unobserve(img);
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('h3').forEach(countUp);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // --- Dynamic Content Handlers --- //
    const processAddedNodes = (node) => {
        node.querySelectorAll('.lazy-img').forEach(img => lazyLoadObserver.observe(img));
        node.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    };

    const dynamicContentObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) processAddedNodes(node);
            });
        });
    });

    // --- Initialization Functions --- //
    const initLazyLoading = () => document.querySelectorAll('.lazy-img').forEach(img => lazyLoadObserver.observe(img));
    const initRevealAnimations = () => document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const renderEvents = (events) => {
        if (!eventsGrid) {
            console.error('Events grid container not found');
            return;
        }

        if (!events || events.length === 0) {
            eventsGrid.innerHTML = `
                <div class="no-events" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <i class="fas fa-calendar-times" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                    <h3>No events found</h3>
                    <p>There are no events in this category. Please try another filter.</p>
                </div>`;
            return;
        }

        eventsGrid.innerHTML = events.map(event => renderEventCard(event)).join('');
        
        // Re-initialize any interactive elements in the cards
        initLazyLoading();
        initRevealAnimations();
    };

    const setupFilters = (events) => {
        if (!eventFiltersContainer) {
            console.error('Event filters container not found');
            return;
        }

        // Ensure events is an array and has items
        if (!Array.isArray(events) || events.length === 0) {
            console.error('No events data available for filtering');
            return;
        }

        // Get unique categories from events
        const categories = ['All', ...new Set(events.map(event => event.category).filter(Boolean))];
        
        // Create filter buttons
        eventFiltersContainer.innerHTML = categories.map(category => {
            const slug = category.toLowerCase().replace(/\s+/g, '-');
            return `
                <button class="filter-btn ${category === 'All' ? 'active' : ''}" 
                        data-filter="${slug}" 
                        aria-label="Filter events by ${category}">
                    ${category}
                </button>`;
        }).join('');

        // Add click event to filter buttons
        eventFiltersContainer.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                
                // Update active state
                eventFiltersContainer.querySelectorAll('.filter-btn')
                    .forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter events
                const filteredEvents = filter === 'all' 
                    ? events 
                    : events.filter(event => {
                        const eventCategory = event.category ? event.category.toLowerCase().replace(/\s+/g, '-') : '';
                        return eventCategory === filter;
                    });
                
                // Render filtered events
                renderEvents(filteredEvents);
            });
        });
    };

    const eventsData = [
        {
            imgSrc: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
            imgAlt: "Basketball Game",
            category: "Tournament",
            title: "3x3 Street Basketball",
            date: "September 15, 2025",
            location: "Downtown Courts"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            imgAlt: "Soccer Match",
            category: "League",
            title: "Weekend Soccer League",
            date: "Every Saturday",
            location: "Central Stadium"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
            imgAlt: "Fitness Class",
            category: "Training",
            title: "HIIT & Cardio Blast",
            date: "Weekday Mornings",
            location: "Main Gym"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
            imgAlt: "Marathon Runners",
            category: "Race",
            title: "Annual City Marathon",
            date: "November 5, 2025",
            location: "City Center"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
            imgAlt: "Mountain Biking",
            category: "Adventure",
            title: "Trail Riding Weekend",
            date: "October 12-13, 2025",
            location: "Green Valley Trails"
        },
        {
            imgSrc: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            imgAlt: "Swimming Competition",
            category: "Championship",
            title: "Regional Swim Meet",
            date: "August 20, 2025",
            location: "Aquatic Center"
        }
];

    const renderEventCard = (event) => {
        return `
            <div class="event-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 1rem; transition: transform 0.3s ease;">
                <img src="${event.imgSrc}" alt="${event.imgAlt}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 1.5rem;">
                    <span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; margin-bottom: 0.75rem;">${event.category}</span>
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0.5rem 0;">${event.title}</h3>
                    <div style="display: flex; align-items: center; color: #64748b; margin: 0.75rem 0;">
                        <i class="far fa-calendar" style="margin-right: 0.5rem;"></i>
                        <span>${event.date}</span>
                    </div>
                    <div style="display: flex; align-items: center; color: #64748b; margin-bottom: 1rem;">
                        <i class="fas fa-map-marker-alt" style="margin-right: 0.5rem;"></i>
                        <span>${event.location}</span>
                    </div>
                    <a href="#" class="btn" style="display: inline-block; background: #2563eb; color: white; padding: 0.5rem 1.25rem; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background 0.3s ease;">
                        Learn More
                    </a>
                </div>
            </div>
        `;
    };

    const renderCoachCard = (coach) => {
        return `
            <div class="coach-card" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 1rem; transition: transform 0.3s ease;">
                <div style="position: relative; height: 300px; overflow: hidden;">
                    <img src="${coach.imgSrc}" alt="${coach.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                        <h3 style="color: white; margin: 0; font-size: 1.25rem;">${coach.name}</h3>
                        <p style="color: #e2e8f0; margin: 0.25rem 0 0; font-size: 0.875rem;">${coach.specialty}</p>
                    </div>
                </div>
                <div style="padding: 1.5rem;">
                    <p style="color: #64748b; margin-bottom: 1.25rem;">${coach.description}</p>
                    <div style="display: flex; gap: 0.75rem;">
                        <a href="${coach.social.twitter || '#'}" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 1.25rem;">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="${coach.social.linkedin || '#'}" target="_blank" style="color: #2563eb; text-decoration: none; font-size: 1.25rem;">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    };

    const initEventsSection = () => {
        console.log('Initializing events section...');
        const eventsGrid = document.getElementById('events-grid');
        const eventFiltersContainer = document.getElementById('event-filters');
        
        if (!eventsGrid || !eventFiltersContainer) {
            console.error('Events grid or filters container not found');
            return;
        }

        try {
            // Clear existing content
            eventsGrid.innerHTML = '';
            
            // Add event cards
            eventsData.forEach(event => {
                eventsGrid.innerHTML += renderEventCard(event);
            });

            // Setup filters
            setupFilters(eventsData);

            // Add event listeners for hover effects
            document.querySelectorAll('.event-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-5px)';
                    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                });
            });
            
        } catch (error) {
            console.error("Error loading events:", error);
            eventsGrid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #ef4444;">Could not load events. Please try again later.</p>';
        }
    };

    const renderCoaches = (coaches) => {
        coachesGrid.innerHTML = '';
        coaches.forEach(coach => {
            const coachCard = document.createElement('div');
            coachCard.className = 'coach-card reveal';
            coachCard.innerHTML = `
                <img data-src="${coach.imgSrc}" alt="${coach.name}" class="coach-image lazy-img">
                <div class="coach-info">
                    <h3>${coach.name}</h3>
                    <p class="coach-title">${coach.title}</p>
                    <p>${coach.description}</p>
                    <div class="coach-social">
                        <a href="${coach.social.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="${coach.social.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            `;
            coachesGrid.appendChild(coachCard);
        });
    };

    const coachesData = [
    {
        name: "Marcus Johnson",
        title: "Head Tennis Coach",
        specialty: "Tennis",
        imgSrc: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Former ATP professional with 10+ years of coaching experience. Specializes in technical skills and mental toughness training.",
        social: {
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "Sarah Williams",
        title: "Swim Coach",
        specialty: "Swimming",
        imgSrc: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Olympic medalist with a passion for teaching proper stroke techniques and endurance training for all skill levels.",
        social: {
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "James Rodriguez",
        title: "Basketball Trainer",
        specialty: "Basketball",
        imgSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        description: "Former college basketball coach specializing in skill development, team strategies, and conditioning programs.",
        social: {
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "Priya Patel",
        title: "Yoga & Flexibility",
        specialty: "Yoga",
        imgSrc: "https://images.unsplash.com/photo-1485727749690-d091e8284ef3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Certified yoga instructor with expertise in improving flexibility, strength, and mental focus for athletes of all levels.",
        social: {
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "David Kim",
        title: "Strength & Conditioning",
        specialty: "Fitness",
        imgSrc: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        description: "Strength coach specializing in sports-specific training programs to enhance performance and prevent injuries.",
        social: {
            twitter: "#",
            linkedin: "#"
        }
    },
    {
        name: "Sophia Chen",
        title: "Nutrition Specialist",
        specialty: "Nutrition",
        imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        description: "Sophia provides personalized nutrition plans to help members optimize their diet for performance and health.",
        social: {
            twitter: "#",
            linkedin: "#"
        }
    }
];

    const initCoachesSection = () => {
        console.log('Initializing coaches section...');
        const coachesGrid = document.getElementById('coaches-grid');
        
        if (!coachesGrid) {
            console.error('Coaches grid element not found');
            return;
        }

        try {
            // Clear existing content
            coachesGrid.innerHTML = '';
            
            // Add coach cards
            coachesData.forEach(coach => {
                coachesGrid.innerHTML += renderCoachCard(coach);
            });

            // Add event listeners for hover effects
            document.querySelectorAll('.coach-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    const img = card.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                });
                card.addEventListener('mouseleave', () => {
                    const img = card.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                });
            });
            
        } catch (error) {
            console.error("Error loading coaches:", error);
            coachesGrid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #ef4444;">Could not load coaches. Please try again later.</p>';
        }
    };

    const countUp = (el) => {
        const text = el.innerText;
        const target = parseInt(text.replace('+', ''), 10);
        if (isNaN(target)) return;
        let current = 0;
        const increment = target / 100;
        const updateCount = () => {
            if (current < target) {
                current += increment;
                el.innerText = Math.ceil(current) + (text.includes('+') ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = text;
            }
        };
        updateCount();
    };

    const initStatsCounter = () => {
        const statsContainer = document.querySelector('.hero-stats');
        if (statsContainer) statsObserver.observe(statsContainer);
    };

    const initTestimonialSlider = () => {
        if (document.querySelector('.testimonial-slider')) {
            const testimonialSlider = new Swiper('.testimonial-slider', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                lazy: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    }
                }
            });
        }
    };

    const initMembershipModal = () => {
        const modalOverlay = document.getElementById('join-modal');
        if (!modalOverlay) return;

        const closeModal = () => modalOverlay.classList.remove('active');

        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href="#join-modal"], .open-modal-btn')) {
                e.preventDefault();
                modalOverlay.classList.add('active');
            }
            if (e.target.matches('.close-modal') || e.target === modalOverlay) {
                closeModal();
            }
        });

        const form = document.getElementById('membership-form');
        if (!form) return;

        const showError = (input, message) => {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            formGroup.querySelector('.error-message').innerText = message;
        };
        const showSuccess = (input) => input.parentElement.classList.remove('error');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const nameInput = form.querySelector('#name');
            const emailInput = form.querySelector('#email');
            const phoneInput = form.querySelector('#phone');

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Full Name is required');
                isValid = false;
            } else { showSuccess(nameInput); }

            const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!emailRe.test(String(emailInput.value).toLowerCase())) {
                showError(emailInput, 'Email is not valid');
                isValid = false;
            } else { showSuccess(emailInput); }

            if (phoneInput.value.trim() === '') {
                showError(phoneInput, 'Phone number is required');
                isValid = false;
            } else { showSuccess(phoneInput); }

            if (isValid) {
                alert('Thank you for your application! We will be in touch shortly.');
                closeModal();
                form.reset();
            }
        });
    };

    // --- Main Initialization --- //
    applyTheme();
    initLazyLoading();
    initRevealAnimations();
    initEventsSection();
    initCoachesSection();
    initStatsCounter();
    initTestimonialSlider();
    initMembershipModal();

    // Re-initialize after loading dynamic content
    const observeDynamicContent = () => {
        const eventsGrid = document.getElementById('events-grid');
        const coachesGrid = document.getElementById('coaches-grid');
        if (eventsGrid) dynamicContentObserver.observe(eventsGrid, { childList: true, subtree: true });
        if (coachesGrid) dynamicContentObserver.observe(coachesGrid, { childList: true, subtree: true });
    };
    
    // Initial observation
    observeDynamicContent();

});
