// Handle option selection in survey
function selectOption(option) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
}

// Handle navigation
function navigate(screen) {
    // Hide all screens
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('reports-screen').style.display = 'none';
    document.getElementById('goals-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'none';
    
    // Show selected screen
    document.getElementById(screen + '-screen').style.display = 'flex';
    
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNav = Array.from(navItems).find(item => 
        item.querySelector('.nav-label').textContent.toLowerCase() === screen
    );
    
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Show empty de survey
function showEmptyScreen(screen) {
    document.getElementById('welcome-survey').style.display = 'none';
    document.getElementById(screen + '-screen').style.display = 'flex';
    
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Activate the  nav item
    navItems[0].classList.add('active');
}

// Update the time in the status bar
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    document.querySelector('.time').textContent = timeString;
}

// Handle reports page navigation
function navigateReportPage(direction) {
    const pages = ['income', 'spending', 'goals'];
    const currentPage = document.querySelector('.report-page.active').id.replace('-page', '');
    const currentIndex = pages.indexOf(currentPage);
    
    let newIndex;
    if (direction === 'next') {
        newIndex = currentIndex + 1;
        if (newIndex >= pages.length) newIndex = pages.length - 1;
    } else {
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = 0;
    }
    
    // Update active page
    document.querySelectorAll('.report-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pages[newIndex]}-page`).classList.add('active');
    
    // Update navigation dots
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        if (index === newIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    document.getElementById('prev-page').disabled = newIndex === 0;
    document.getElementById('next-page').disabled = newIndex === pages.length - 1;
}

// Handle navigation dot click
function handleNavDotClick(page) {
    const pages = ['income', 'spending', 'goals'];
    const newIndex = pages.indexOf(page);
    
    // Update active page
    document.querySelectorAll('.report-page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(`${page}-page`).classList.add('active');
    
    // Update navigation dots
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        if (index === newIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    document.getElementById('prev-page').disabled = newIndex === 0;
    document.getElementById('next-page').disabled = newIndex === pages.length - 1;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Show home screen by default
    navigate('reports');
    
    // Update time
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
    
    // Add event listeners for navigation buttons
    document.getElementById('prev-page').addEventListener('click', () => navigateReportPage('prev'));
    document.getElementById('next-page').addEventListener('click', () => navigateReportPage('next'));
    
    // Add event listeners for navigation dots
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            handleNavDotClick(this.getAttribute('data-page'));
        });
    });
});
