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
    
    // Initialize charts if navigating to reports screen
    if (screen === 'reports') {
        initializeCharts();
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

// Sample data for charts
const sampleData = {
    income: {
        thisWeek: [120, 150, 180, 200, 220, 250, 300],
        lastWeek: [100, 130, 160, 180, 200, 230, 270],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    spending: {
        categories: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other'],
        amounts: [450, 270, 180, 320, 550, 150],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
    },
    budget: {
        Food: 500,
        Transport: 300,
        Entertainment: 200,
        Shopping: 350,
        Bills: 600,
        Other: 200
    }
};

// Initialize charts
function initializeCharts() {
    // Income comparison chart
    const incomeCtx = document.getElementById('income-chart').getContext('2d');
    const incomeChart = new Chart(incomeCtx, {
        type: 'line',
        data: {
            labels: sampleData.income.labels,
            datasets: [
                {
                    label: 'This Week',
                    data: sampleData.income.thisWeek,
                    borderColor: '#4b7bec',
                    backgroundColor: 'rgba(75, 123, 236, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Last Week',
                    data: sampleData.income.lastWeek,
                    borderColor: '#a5b1c2',
                    backgroundColor: 'rgba(165, 177, 194, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Spending by category chart
    const categoryCtx = document.getElementById('category-chart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: sampleData.spending.categories,
            datasets: [{
                data: sampleData.spending.amounts,
                backgroundColor: sampleData.spending.colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
    
    // Check for budget alerts
    checkBudgetAlerts();
}

// Check if any category has exceeded its budget
function checkBudgetAlerts() {
    const budgetAlert = document.getElementById('budget-alert');
    const alertMessage = document.querySelector('.alert-message');
    
    // Check if budget alerts are enabled
    const budgetAlertsEnabled = document.getElementById('budget-alerts-toggle').checked;
    
    if (!budgetAlertsEnabled) {
        budgetAlert.classList.add('hidden');
        return;
    }
    
    // Find categories that have exceeded their budget
    const overspentCategories = [];
    
    for (let i = 0; i < sampleData.spending.categories.length; i++) {
        const category = sampleData.spending.categories[i];
        const spent = sampleData.spending.amounts[i];
        const budget = sampleData.budget[category];
        
        if (spent > budget) {
            overspentCategories.push(category);
        }
    }
    
    if (overspentCategories.length > 0) {
        // Show alert for the first overspent category
        alertMessage.textContent = `You've overspent on ${overspentCategories[0]}`;
        budgetAlert.classList.remove('hidden');
    } else {
        budgetAlert.classList.add('hidden');
    }
}

// Handle report filter change
function handleReportFilter() {
    const filterValue = document.getElementById('report-filter').value;
    
    // In a real app, this would fetch new data based on the filter
    // For this prototype, we'll just show a message
    console.log(`Filter changed to: ${filterValue}`);
    
    // Reinitialize charts with new data (in a real app)
    initializeCharts();
}

// Handle currency change
function handleCurrencyChange() {
    const currency = document.getElementById('currency-selector').value;
    
    // In a real app, this would update all currency displays
    // For this prototype, we'll just show a message
    console.log(`Currency changed to: ${currency}`);
}

// Handle budget cycle change
function handleBudgetCycleChange() {
    const cycle = document.getElementById('budget-cycle').value;
    
    // In a real app, this would update the budget cycle
    // For this prototype, we'll just show a message
    console.log(`Budget cycle changed to: ${cycle}`);
}

// Handle budget alerts toggle
function handleBudgetAlertsToggle() {
    const enabled = document.getElementById('budget-alerts-toggle').checked;
    
    // In a real app, this would update notification settings
    // For this prototype, we'll just show a message
    console.log(`Budget alerts ${enabled ? 'enabled' : 'disabled'}`);
    
    // Update budget alerts display
    checkBudgetAlerts();
}

// Handle dark mode toggle
function handleDarkModeToggle() {
    const enabled = document.getElementById('dark-mode-toggle').checked;
    
    if (enabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // In a real app, this would save the preference
    console.log(`Dark mode ${enabled ? 'enabled' : 'disabled'}`);
}

document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
    
    // Add event listener for Skip button
    const skipButton = document.querySelector('.btn-outline');
    skipButton.addEventListener('click', function() {
        showEmptyScreen('home');
    });
    
    // Add event listeners for report filter
    document.getElementById('report-filter').addEventListener('change', handleReportFilter);
    
    // Add event listeners for settings
    document.getElementById('currency-selector').addEventListener('change', handleCurrencyChange);
    document.getElementById('budget-cycle').addEventListener('change', handleBudgetCycleChange);
    document.getElementById('budget-alerts-toggle').addEventListener('change', handleBudgetAlertsToggle);
    document.getElementById('dark-mode-toggle').addEventListener('change', handleDarkModeToggle);
});
