// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Three.js 3D Background Animation
let scene, camera, renderer, particles;

function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating geometric shapes
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.7, 12, 8),
        new THREE.ConeGeometry(0.7, 1.5, 8),
        new THREE.OctahedronGeometry(0.8),
    ];

    const materials = [
        new THREE.MeshBasicMaterial({ 
            color: 0x1a5f3f, 
            transparent: true, 
            opacity: 0.7,
            wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
            color: 0x2d8f5f, 
            transparent: true, 
            opacity: 0.6,
            wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
            color: 0xa0d4c7, 
            transparent: true, 
            opacity: 0.5,
            wireframe: true 
        }),
    ];

    particles = [];

    // Create particles
    for (let i = 0; i < 30; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 20;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;

        // Store animation properties
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatOffset: Math.random() * Math.PI * 2
        };

        scene.add(mesh);
        particles.push(mesh);
    }

    camera.position.z = 15;

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    if (particles) {
        particles.forEach((particle, index) => {
            // Rotation animation
            particle.rotation.x += particle.userData.rotationSpeed.x;
            particle.rotation.y += particle.userData.rotationSpeed.y;
            particle.rotation.z += particle.userData.rotationSpeed.z;

            // Floating animation
            particle.position.y += Math.sin(Date.now() * particle.userData.floatSpeed + particle.userData.floatOffset) * 0.01;
            particle.position.x += Math.cos(Date.now() * particle.userData.floatSpeed + particle.userData.floatOffset) * 0.005;
        });
    }

    // Camera movement based on mouse position
    if (window.mouseX !== undefined && window.mouseY !== undefined) {
        camera.position.x += (window.mouseX * 0.01 - camera.position.x) * 0.05;
        camera.position.y += (-window.mouseY * 0.01 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
}

// Mouse movement for 3D interaction
document.addEventListener('mousemove', (event) => {
    window.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    window.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Card hover effects
document.querySelectorAll('.feature-card, .problem-card, .tech-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Floating animation for cards
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-cards .card');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 1000; // 1 second delay between each card
        element.style.animationDelay = `${delay}ms`;
    });
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize Three.js after page load
    setTimeout(() => {
        initThreeJS();
        animateThreeJS();
    }, 500);
    
    // Add floating animation
    addFloatingAnimation();
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Button click animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth reveal animations for timeline
function revealTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Initialize timeline animation when section is visible
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            revealTimeline();
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const roadmapSection = document.querySelector('.roadmap-section');
    if (roadmapSection) {
        timelineObserver.observe(roadmapSection);
    }
});

// Add loading screen
const loadingHTML = `
    <div id="loading-screen" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    ">
        <div style="text-align: center; color: white;">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <h3 style="font-family: 'Tajawal', sans-serif; font-weight: 600;">جاري التحميل...</h3>
        </div>
    </div>
    <style>
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`;

document.body.insertAdjacentHTML('afterbegin', loadingHTML);

// Remove loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1000);
});

// Video functionality
document.addEventListener('DOMContentLoaded', function() {
    // Introduction video controls
    const introVideo = document.getElementById('intro-video');
    const playOverlay = document.querySelector('.video-play-overlay');
    
    if (introVideo && playOverlay) {
        // Play video when overlay is clicked
        playOverlay.addEventListener('click', function() {
            if (introVideo.paused) {
                introVideo.play();
                playOverlay.style.opacity = '0';
            }
        });
        
        // Show overlay when video is paused
        introVideo.addEventListener('pause', function() {
            playOverlay.style.opacity = '1';
        });
        
        // Hide overlay when video is playing
        introVideo.addEventListener('play', function() {
            playOverlay.style.opacity = '0';
        });
        
        // Show overlay when video ends
        introVideo.addEventListener('ended', function() {
            playOverlay.style.opacity = '1';
        });
    }

    // Handle video play/pause for other videos
    const videoContainers = document.querySelectorAll('.video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.video-overlay');
        
        if (video && overlay) {
            // Play video when overlay is clicked
            overlay.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    overlay.style.opacity = '0';
                } else {
                    video.pause();
                    overlay.style.opacity = '1';
                }
            });
            
            // Show/hide overlay on video events
            video.addEventListener('play', function() {
                overlay.style.opacity = '0';
            });
            
            video.addEventListener('pause', function() {
                overlay.style.opacity = '1';
            });
            
            video.addEventListener('ended', function() {
                overlay.style.opacity = '1';
            });
            
            // Hide overlay when video is playing and mouse leaves
            container.addEventListener('mouseleave', function() {
                if (!video.paused) {
                    overlay.style.opacity = '0';
                }
            });
            
            // Show overlay when mouse enters (only if video is paused)
            container.addEventListener('mouseenter', function() {
                if (video.paused) {
                    overlay.style.opacity = '1';
                }
            });
        }
    });
    
    // Pause other videos when one starts playing
    const videos = document.querySelectorAll('.video-container video');
    videos.forEach(video => {
        video.addEventListener('play', function() {
            videos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });
});
