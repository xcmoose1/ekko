// Scroll-based navigation styling
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add stagger effect for service cards
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('.philosophy-content, .services-header, .service-card, .tech-content, .dashboard-preview, .ekko-card, .ekko-promise, .contact-content').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add specific animation for sound waves
    const soundWave = document.querySelector('.sound-wave');
    if (soundWave) {
        observer.observe(soundWave);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic number counter animation
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-value');
    
    numbers.forEach(number => {
        const updateCount = () => {
            const target = number.innerText;
            const isPercentage = target.includes('%');
            const isTime = target.includes('t');
            const is247 = target === '24/7';
            
            if (is247 || isTime) {
                return; // Don't animate these
            }
            
            let finalValue = parseInt(target);
            if (isNaN(finalValue)) return;
            
            let current = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(timer);
                }
                
                if (isPercentage) {
                    number.innerText = Math.floor(current) + '%';
                } else {
                    number.innerText = Math.floor(current) + (target.includes('+') ? '+' : '');
                }
            }, 30);
        };
        
        // Start animation when element is visible
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numberObserver.observe(number);
    });
};

document.addEventListener('DOMContentLoaded', animateNumbers);

// Service card hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-sphere');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.hero-cta, .contact-item').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Dashboard chart animation
const animateChart = () => {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animation = 'grow-bar 0.5s ease-out forwards';
        }, index * 100);
    });
};

// Add the animation
const style = document.createElement('style');
style.textContent = `
    @keyframes grow-bar {
        from {
            height: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Open service modal
function openServiceModal(serviceName) {
    // For now, just show an alert with service info
    const serviceInfo = {
        'renhold': 'Kontakt oss for mer informasjon om våre renholdstjenester',
        'spesialist': 'Kontakt oss for mer informasjon om våre spesialisttjenester',
        'temporaere': 'Kontakt oss for mer informasjon om våre temporære tjenester',
        'matter': 'Kontakt oss for mer informasjon om vår matteservice',
        'forbruk': 'Kontakt oss for mer informasjon om forbruksvarer',
        'baerekraft': 'Kontakt oss for mer informasjon om våre bærekraftstiltak'
    };
    
    alert(serviceInfo[serviceName] || 'Kontakt oss på post@ekko.no for mer informasjon');
}

// Close service modal
function closeServiceModal(serviceName) {
    const modal = document.getElementById(`modal-${serviceName}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('service-details')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.service-details.active').forEach(d => {
            d.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Trigger chart animation when visible
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateChart();
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const dashboardChart = document.querySelector('.dashboard-chart');
if (dashboardChart) {
    chartObserver.observe(dashboardChart);
}