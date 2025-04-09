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
    document.getElementById('manage-budget-screen').style.display = 'none';
    document.getElementById('add-expense-screen').style.display = 'none';
    document.getElementById('adjust-budget-screen').style.display = 'none';
    document.getElementById('set-goals-screen').style.display = 'none';
    document.getElementById('add-transaction-screen').style.display = 'none';
    document.getElementById('recurring-transaction-screen').style.display = 'none';
    document.getElementById('bills-screen').style.display = 'none';
    
    // Show selected screen
    document.getElementById(screen + '-screen').style.display = 'flex';
    
    // Update active nav item only for main navigation items
    if (['home', 'reports', 'goals', 'settings'].includes(screen)) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        
        const activeNav = Array.from(navItems).find(item => 
            item.querySelector('.nav-label').textContent.toLowerCase() === screen
        );
        
        if (activeNav) {
            activeNav.classList.add('active');
        }
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

// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    navigate('home');
    
    // Update time
    updateTime();
    setInterval(updateTime, 60000);
    
    // Add Expense Form Handler
    const expenseForm = document.querySelector('.expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                type: document.getElementById('transaction-type').value,
                amount: document.getElementById('amount').value,
                category: document.getElementById('category').value,
                date: document.getElementById('date').value,
                note: document.getElementById('note').value
            };
            console.log('New transaction:', formData);
            // Here you would typically save the data
            alert('Transaction saved successfully!');
            navigate('manage-budget');
        });
    }
    
    // Budget Changes Handler
    const saveBudgetBtn = document.querySelector('.budget-categories-list + .submit-btn');
    if (saveBudgetBtn) {
        saveBudgetBtn.addEventListener('click', function() {
            const categories = document.querySelectorAll('.category-budget-item');
            const budgetData = Array.from(categories).map(category => ({
                name: category.querySelector('.category-name').textContent,
                amount: category.querySelector('.budget-input').value
            }));
            console.log('Updated budgets:', budgetData);
            alert('Budget changes saved successfully!');
            navigate('manage-budget');
        });
    }
    
    // Add New Goal Handler
    const addGoalBtn = document.querySelector('.add-goal-btn');
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', function() {
            // Here you would typically show a form to add a new goal
            alert('Add new goal functionality coming soon!');
        });
    }
    
    // Edit Goal Handlers
    const editGoalBtns = document.querySelectorAll('.edit-goal-btn');
    editGoalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const goalName = this.closest('.goal-item').querySelector('h3').textContent;
            // Here you would typically show an edit form
            alert(`Edit ${goalName} coming soon!`);
        });
    });
    
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
function markBillPaid(billName) {
    alert(`✅ ${billName} bill marked as paid!`);
}