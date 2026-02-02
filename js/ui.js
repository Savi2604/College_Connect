// js/ui.js

/**
 * Initializes UI Components: Theme, Navbar, Dropdowns
 */
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSidebar(); // Start Sidebar
    initParticles(); // Start Particles
});



/* --- Navbar Logic --- */
function initNavbar() {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Profile Dropdown
    const profileBtn = document.querySelector('.profile-btn');
    const dropdown = document.querySelector('.dropdown-content');

    if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }

    // Set Active Link based on URL
    const links = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname.split('/').pop();

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Init Toast Container
    if (!document.getElementById('toast-container')) {
        const tc = document.createElement('div');
        tc.id = 'toast-container';
        tc.className = 'toast-container';
        document.body.appendChild(tc);
    }
}

/* --- Toast Notifications --- */
window.showToast = function (message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);

    // Click to remove
    toast.onclick = () => toast.remove();
};

// Override native alert for better UI
window.nativeAlert = window.alert;
window.alert = function (message) {
    window.showToast(message, 'info'); // Default to info toast instead of ugly popup
};


/* --- Sidebar Logic --- */
function initSidebar() {
    // Only run if desktop or large screen? CSS handles display:none, but we can inject anyway.

    // Determine Role based on URL
    const path = window.location.pathname;
    let role = null;
    if (path.includes('/student/')) role = 'student';
    else if (path.includes('/admin/')) role = 'admin';

    if (!role) return; // Not in a recognized module

    const sidebar = document.createElement('aside');
    sidebar.className = 'left-sidebar';

    // Define Links
    let linksHtml = '';

    if (role === 'student') {
        // Assume we are in /student/ directory, so links are relative
        linksHtml = `
            <h3><i class="fas fa-compass"></i> Quick Nav</h3>
            <a href="index.html" class="sidebar-link"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="announcements.html" class="sidebar-link"><i class="fas fa-bullhorn"></i> Announcements</a>
            <a href="attendance.html" class="sidebar-link"><i class="fas fa-calendar-check"></i> Attendance</a>
            <a href="view-notes.html" class="sidebar-link"><i class="fas fa-book-open"></i> Notes</a>
            <a href="view-marks.html" class="sidebar-link"><i class="fas fa-chart-line"></i> Marks</a>
            <a href="leave-request.html" class="sidebar-link"><i class="fas fa-paper-plane"></i> Apply Leave</a>
            <a href="leave-status.html" class="sidebar-link"><i class="fas fa-info-circle"></i> Leave Status</a>
            
            <div class="sidebar-info-box">
                <i class="fas fa-graduation-cap" style="font-size: 24px; color: var(--primary); margin-bottom: 10px;"></i>
                <p><strong>Student Panel</strong></p>
                <p>v1.2.0 • College Connect</p>
            </div>
        `;
    } else if (role === 'admin') {
        linksHtml = `
            <h3><i class="fas fa-tools"></i> Admin Tools</h3>
            <a href="index.html" class="sidebar-link"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="upload-attendance.html" class="sidebar-link"><i class="fas fa-user-check"></i> Attendance</a>
            <a href="post-announcement.html" class="sidebar-link"><i class="fas fa-bullhorn"></i> Announcement</a>
            <a href="upload-marks.html" class="sidebar-link"><i class="fas fa-file-invoice"></i> Marks</a>
            <a href="advisor-leave.html" class="sidebar-link"><i class="fas fa-envelope-open-text"></i> Leave Requests</a>
            <a href="upload-notes.html" class="sidebar-link"><i class="fas fa-book"></i> Notes</a>
            
            <div class="sidebar-info-box">
                <i class="fas fa-user-shield" style="font-size: 24px; color: var(--primary); margin-bottom: 10px;"></i>
                <p><strong>Admin Console</strong></p>
                <p>Manage System</p>
            </div>
        `;
    }

    sidebar.innerHTML = linksHtml;
    document.body.appendChild(sidebar);

    // Add class to body for padding adjustment
    document.body.classList.add('with-sidebar');

    // Highlight Active Link
    const currentFile = path.split('/').pop();
    const activeLink = sidebar.querySelector(`a[href="${currentFile}"]`);
    if (activeLink) {
        activeLink.style.background = 'var(--primary)';
        activeLink.style.color = 'white';
        activeLink.querySelector('i').style.color = 'white';
    }
}


/* --- Classic Particle Animation (Canvas) --- */
function initParticles() {
    const container = document.querySelector('.dynamic-bg');
    if (!container) return;

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    container.innerHTML = ''; // Clear existing
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Particle Config
    const particleCount = 80; // Number of dots
    const connectionDist = 150; // Distance to draw lines
    const mouseDist = 200; // Mouse interaction radius

    let mouse = { x: null, y: null };

    // Resize Handler
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse Handler
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5; // Speed
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse Interaction (Repel)
            /*
            if(mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < mouseDist) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDist - distance) / mouseDist;
                    const directionX = forceDirectionX * force * 3;
                    const directionY = forceDirectionY * force * 3;
                    this.vx -= directionX;
                    this.vy -= directionY;
                }
            }
            */
        }

        draw() {
            // Indigo 400 for Dark Mode, Indigo 600 for Light Mode
            ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#818cf8' : '#4f46e5';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update & Draw Particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw Connections
        const isDark = document.body.classList.contains('dark-mode');
        // Indigo 400 (RGB: 129, 140, 248) for Dark, Indigo 600 (RGB: 79, 70, 229) for Light
        const lineColor = isDark ? '129, 140, 248' : '79, 70, 229';

        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDist) {
                    let opacity = 1 - (distance / connectionDist);
                    ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
            // Connect to mouse
            if (mouse.x != null) {
                let dx = particles[a].x - mouse.x;
                let dy = particles[a].y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseDist) {
                    let opacity = 1 - (distance / mouseDist);
                    ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
