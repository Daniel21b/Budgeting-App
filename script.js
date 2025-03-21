// Handle option selection in survey
function selectOption(option) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
}

// Handle navigation
function navigate(screen) {
    // Hide all screens
    document.getElementById('welcome-survey').style.display = 'none';
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('reports-screen').style.display = 'none';
    document.getElementById('goals-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'none';
    
    // Show selected screen
    document.getElementById(screen + '-screen').style.display = 'flex';
    
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find the nav item with matching screen and make it active
    const activeNav = Array.from(navItems).find(item => 
        item.querySelector('.nav-label').textContent.toLowerCase() === screen ||
        (item.querySelector('.nav-label').textContent === 'Home' && screen === 'home')
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
    
    // Format time to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    document.querySelector('.time').textContent = timeString;
}


document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
    
    // Add event listener for Skip button
    const skipButton = document.querySelector('.btn-outline');
    skipButton.addEventListener('click', function() {
        showEmptyScreen('home');
    });
});
