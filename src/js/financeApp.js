document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and text size based on saved preferences
    initializeAppSettings();
    
    // Initialize financial data
    initializeFinancialData();
    
    // Event Listeners for Dashboard Actions
    document.getElementById('view-budget-btn').addEventListener('click', function() {
        // Switch to budget tab
        activateTab('Budgets');
    });
    
    document.getElementById('add-expense-btn').addEventListener('click', function() {
        // Switch to expenses tab
        activateTab('Expenses');
        // Show the expense form
        document.getElementById('expense-form').style.display = 'block';
    });
    
    document.getElementById('remaining-balance-btn').addEventListener('click', function() {
        // Show remaining balance modal
        showRemainingBalanceModal();
    });
    
    // Event Listeners for Expenses Tab
    document.getElementById('save-expense-btn').addEventListener('click', function() {
        saveExpense();
    });
    
    // Event Listeners for Settings Tab
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.addEventListener('change', function() {
        applyTheme(this.value);
        saveSettings();
    });
    
    const textSizeSelector = document.getElementById('text-size-selector');
    textSizeSelector.addEventListener('change', function() {
        applyTextSize(this.value);
        saveSettings();
    });
    
    const defaultBudgetPeriod = document.getElementById('default-budget-period');
    defaultBudgetPeriod.addEventListener('change', function() {
        saveSettings();
    });
    
    const currencySelector = document.getElementById('currency-selector');
    currencySelector.addEventListener('change', function() {
        saveSettings();
    });
    
    document.querySelector('.save-settings-button').addEventListener('click', function() {
        saveSettings();
        alert('Settings saved successfully!');
    });
    
    // Event Listeners for Budget Type Selection
    const budgetTypeRadios = document.querySelectorAll('input[name="budget-type"]');
    budgetTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateBudgetPeriod(this.value);
        });
    });
    
    // Monitor keyboard visibility for form adjustments
    window.addEventListener('resize', handleKeyboardVisibility);
});

// Function to activate a specific tab
function activateTab(tabId) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Function to initialize app settings from localStorage
function initializeAppSettings() {
    // Get saved settings or use defaults
    const settings = JSON.parse(localStorage.getItem('financeAppSettings')) || {
        theme: 'default',
        textSize: 'medium',
        defaultBudgetPeriod: 'monthly',
        currency: 'usd'
    };
    
    // Apply theme
    applyTheme(settings.theme);
    document.getElementById('theme-selector').value = settings.theme;
    
    // Apply text size
    applyTextSize(settings.textSize);
    document.getElementById('text-size-selector').value = settings.textSize;
    
    // Set budget period
    document.getElementById('default-budget-period').value = settings.defaultBudgetPeriod;
    
    // Set currency
    document.getElementById('currency-selector').value = settings.currency;
}

// Function to apply theme
function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'high-contrast-theme');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'high-contrast') {
        document.body.classList.add('high-contrast-theme');
    }
}

// Function to apply text size
function applyTextSize(size) {
    document.body.classList.remove('text-size-small', 'text-size-large');
    
    if (size === 'small') {
        document.body.classList.add('text-size-small');
    } else if (size === 'large') {
        document.body.classList.add('text-size-large');
    }
}

// Function to save settings to localStorage
function saveSettings() {
    const settings = {
        theme: document.getElementById('theme-selector').value,
        textSize: document.getElementById('text-size-selector').value,
        defaultBudgetPeriod: document.getElementById('default-budget-period').value,
        currency: document.getElementById('currency-selector').value
    };
    
    localStorage.setItem('financeAppSettings', JSON.stringify(settings));
}

// Function to initialize financial data
function initializeFinancialData() {
    // Check if financial data exists in localStorage
    if (!localStorage.getItem('financeAppData')) {
        // Create demo data if none exists
        const demoData = {
            budget: {
                type: 'monthly',
                totalAmount: 2000,
                startDate: '2023-05-01',
                endDate: '2023-05-31',
                categories: [
                    { name: 'Housing', allocated: 1000, spent: 800 },
                    { name: 'Food', allocated: 500, spent: 300 },
                    { name: 'Transport', allocated: 350, spent: 140 },
                    { name: 'Utilities', allocated: 150, spent: 0 }
                ]
            },
            expenses: [
                { id: 'exp1', amount: 800, category: 'Housing', date: '2023-05-01', description: 'Rent Payment' },
                { id: 'exp2', amount: 120, category: 'Food', date: '2023-05-03', description: 'Grocery Shopping' },
                { id: 'exp3', amount: 45, category: 'Transport', date: '2023-05-05', description: 'Gas' },
                { id: 'exp4', amount: 180, category: 'Food', date: '2023-05-10', description: 'Restaurant Dinner' },
                { id: 'exp5', amount: 95, category: 'Transport', date: '2023-05-12', description: 'Car Maintenance' }
            ],
            goals: [
                { id: 'goal1', title: 'Vacation Fund', targetAmount: 3000, currentAmount: 1500, deadline: '2023-12-31' },
                { id: 'goal2', title: 'Emergency Fund', targetAmount: 5000, currentAmount: 2000, deadline: null },
                { id: 'goal3', title: 'New Laptop', targetAmount: 1200, currentAmount: 800, deadline: '2023-08-15' }
            ]
        };
        
        localStorage.setItem('financeAppData', JSON.stringify(demoData));
    }
    
    // Update UI with financial data
    updateDashboard();
    updateBudgetView();
    updateExpensesView();
    updateGoalsView();
}

// Function to update dashboard with current data
function updateDashboard() {
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    
    // Calculate total spent and remaining
    let totalSpent = 0;
    let totalBudget = data.budget.totalAmount;
    
    data.budget.categories.forEach(category => {
        totalSpent += category.spent;
    });
    
    const remainingBudget = totalBudget - totalSpent;
    const spentPercentage = Math.round((totalSpent / totalBudget) * 100);
    
    // Update budget overview
    document.querySelector('.progress-stats .stat:nth-child(1) .value').textContent = `$${totalSpent}`;
    document.querySelector('.progress-stats .stat:nth-child(2) .value').textContent = `$${remainingBudget}`;
    document.querySelector('.progress-stats .stat:nth-child(3) .value').textContent = `$${totalBudget}`;
    document.querySelector('.progress-bar').style.width = `${spentPercentage}%`;
    
    // Update top categories
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = '';
    
    // Sort categories by spent amount (descending)
    const sortedCategories = [...data.budget.categories].sort((a, b) => b.spent - a.spent);
    
    // Display top 3 categories
    for (let i = 0; i < Math.min(3, sortedCategories.length); i++) {
        const category = sortedCategories[i];
        const spentPercent = Math.round((category.spent / category.allocated) * 100);
        
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.innerHTML = `
            <div class="category-icon ${category.name.toLowerCase()}">
                <i class="material-icons">${getCategoryIcon(category.name)}</i>
            </div>
            <div class="category-details">
                <div class="category-name">${category.name}</div>
                <div class="category-progress-container">
                    <div class="category-progress" style="width: ${spentPercent}%"></div>
                </div>
                <div class="category-values">
                    <span>$${category.spent} of $${category.allocated}</span>
                </div>
            </div>
        `;
        
        categoryList.appendChild(categoryItem);
    }
}

// Function to update budget view
function updateBudgetView() {
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    
    // Update budget type selection
    document.querySelector(`input[name="budget-type"][value="${data.budget.type}"]`).checked = true;
    
    // Update budget total
    document.querySelector('.budget-value').textContent = `$${data.budget.totalAmount}`;
    
    // Calculate total spent and remaining
    let totalSpent = 0;
    let totalBudget = data.budget.totalAmount;
    
    data.budget.categories.forEach(category => {
        totalSpent += category.spent;
    });
    
    const remainingBudget = totalBudget - totalSpent;
    const spentPercentage = Math.round((totalSpent / totalBudget) * 100);
    
    // Update progress bar
    document.querySelector('.progress-details span').textContent = `$${totalSpent} spent of $${totalBudget}`;
    document.querySelector('.progress-details .percentage').textContent = `${spentPercentage}%`;
    document.querySelector('.budget-progress-container .progress-bar').style.width = `${spentPercentage}%`;
    document.querySelector('.remaining-value').textContent = `$${remainingBudget}`;
    
    // Update categories
    const categoriesContainer = document.querySelector('.budget-categories');
    // Keep the heading
    const categoriesHeading = categoriesContainer.querySelector('h3');
    categoriesContainer.innerHTML = '';
    categoriesContainer.appendChild(categoriesHeading);
    
    data.budget.categories.forEach(category => {
        const spentPercent = Math.round((category.spent / category.allocated) * 100);
        const remaining = category.allocated - category.spent;
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'budget-category';
        categoryElement.innerHTML = `
            <div class="category-header">
                <div class="category-icon ${category.name.toLowerCase()}">
                    <i class="material-icons">${getCategoryIcon(category.name)}</i>
                </div>
                <div class="category-name">${category.name}</div>
                <div class="category-allocation">$${category.allocated}</div>
            </div>
            <div class="category-progress-container">
                <div class="category-progress" style="width: ${spentPercent}%"></div>
            </div>
            <div class="category-details">
                <span>$${category.spent} spent (${spentPercent}%)</span>
                <span>$${remaining} remaining</span>
            </div>
        `;
        
        categoriesContainer.appendChild(categoryElement);
    });
}

// Function to update expenses view
function updateExpensesView() {
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    
    // Set today's date as default for new expenses
    document.getElementById('expense-date').valueAsDate = new Date();
    
    // Update expenses list
    const expensesList = document.querySelector('.expenses-list');
    expensesList.innerHTML = '';
    
    // Sort expenses by date (most recent first)
    const sortedExpenses = [...data.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedExpenses.forEach(expense => {
        const date = new Date(expense.date);
        const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
        
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-icon ${expense.category.toLowerCase()}">
                <i class="material-icons">${getCategoryIcon(expense.category)}</i>
            </div>
            <div class="expense-details">
                <div class="expense-primary">
                    <span class="expense-name">${expense.description}</span>
                    <span class="expense-amount">$${expense.amount}</span>
                </div>
                <div class="expense-secondary">
                    <span class="expense-date">${formattedDate}</span>
                    <span class="expense-category">${expense.category}</span>
                </div>
            </div>
        `;
        
        expensesList.appendChild(expenseItem);
    });
}

// Function to update goals view
function updateGoalsView() {
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    
    // Update goals list
    const goalsList = document.querySelector('.goals-list');
    goalsList.innerHTML = '';
    
    data.goals.forEach(goal => {
        const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
        const deadlineText = goal.deadline ? `Target: ${formatDeadline(goal.deadline)}` : 'Target: Ongoing';
        
        const goalItem = document.createElement('div');
        goalItem.className = 'goal-item';
        goalItem.innerHTML = `
            <div class="goal-info">
                <h3>${goal.title}</h3>
                <p class="goal-deadline">${deadlineText}</p>
            </div>
            <div class="goal-progress">
                <div class="goal-progress-text">
                    <span>$${goal.currentAmount} of $${goal.targetAmount}</span>
                    <span>${progress}%</span>
                </div>
                <div class="goal-progress-bar-container">
                    <div class="goal-progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
        
        goalsList.appendChild(goalItem);
    });
}

// Function to save a new expense
function saveExpense() {
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const description = document.getElementById('expense-description').value;
    const date = document.getElementById('expense-date').value;
    
    if (!amount || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    
    if (!description.trim()) {
        alert('Please enter a description.');
        return;
    }
    
    if (!date) {
        alert('Please select a date.');
        return;
    }
    
    // Generate a unique ID
    const expenseId = 'exp' + Date.now();
    
    // Get current data
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    
    // Add new expense
    const newExpense = {
        id: expenseId,
        amount: amount,
        category: capitalizeFirstLetter(category),
        date: date,
        description: description
    };
    
    data.expenses.push(newExpense);
    
    // Update category spent amount
    const categoryIndex = data.budget.categories.findIndex(c => 
        c.name.toLowerCase() === category.toLowerCase());
    
    if (categoryIndex !== -1) {
        data.budget.categories[categoryIndex].spent += amount;
    } else {
        // If category doesn't exist, create it
        data.budget.categories.push({
            name: capitalizeFirstLetter(category),
            allocated: amount * 1.5, // Allocate 1.5x the spent amount as a default
            spent: amount
        });
    }
    
    // Save updated data
    localStorage.setItem('financeAppData', JSON.stringify(data));
    
    // Clear form
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-date').valueAsDate = new Date();
    
    // Update UI
    updateDashboard();
    updateBudgetView();
    updateExpensesView();
    
    // Show confirmation
    alert('Expense saved successfully!');
}

// Function to update budget period
function updateBudgetPeriod(periodType) {
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    data.budget.type = periodType;
    
    // Update date ranges based on period type
    const now = new Date();
    let startDate, endDate;
    
    if (periodType === 'monthly') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (periodType === 'weekly') {
        const dayOfWeek = now.getDay();
        const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
        startDate = new Date(now.setDate(diff));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
    } else {
        // Custom - keep existing dates
        startDate = new Date(data.budget.startDate);
        endDate = new Date(data.budget.endDate);
    }
    
    data.budget.startDate = startDate.toISOString().split('T')[0];
    data.budget.endDate = endDate.toISOString().split('T')[0];
    
    localStorage.setItem('financeAppData', JSON.stringify(data));
    
    // Update period indicator on dashboard
    let periodText;
    if (periodType === 'monthly') {
        periodText = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (periodType === 'weekly') {
        periodText = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else {
        periodText = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    }
    
    document.querySelector('.period-indicator').textContent = periodText;
}

// Function to show remaining balance modal
function showRemainingBalanceModal() {
    const data = JSON.parse(localStorage.getItem('financeAppData'));
    
    // Calculate total spent and remaining
    let totalSpent = 0;
    let totalBudget = data.budget.totalAmount;
    
    data.budget.categories.forEach(category => {
        totalSpent += category.spent;
    });
    
    const remainingBudget = totalBudget - totalSpent;
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'balance-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Remaining Balance</h3>
            <div class="balance-amount">$${remainingBudget}</div>
            <p>You've spent $${totalSpent} out of your total budget of $${totalBudget}.</p>
            <div class="daily-budget">
                <p>Daily budget for rest of period:</p>
                <span>$${calculateDailyBudget(remainingBudget, data.budget.endDate)}</span>
            </div>
            <button class="close-modal-btn">Close</button>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .balance-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: var(--card-color);
            padding: 24px;
            border-radius: 8px;
            width: 80%;
            max-width: 400px;
            text-align: center;
        }
        
        .balance-amount {
            font-size: 36px;
            font-weight: bold;
            color: var(--primary-color);
            margin: 16px 0;
        }
        
        .daily-budget {
            margin-top: 16px;
            padding: 16px;
            background-color: var(--background-color);
            border-radius: 8px;
        }
        
        .daily-budget span {
            font-weight: bold;
            font-size: 24px;
            color: var(--primary-color);
        }
        
        .close-modal-btn {
            margin-top: 24px;
            padding: 12px 24px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Add event listener to close button
    document.querySelector('.close-modal-btn').addEventListener('click', function() {
        modal.remove();
    });
}

// Function to calculate daily budget for remaining days
function calculateDailyBudget(remainingAmount, endDateStr) {
    const endDate = new Date(endDateStr);
    const today = new Date();
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) + 1; // +1 to include today
    
    if (daysRemaining <= 0) return "0"; // Period has ended
    
    const dailyBudget = remainingAmount / daysRemaining;
    return dailyBudget.toFixed(2);
}

// Function to get icon for a category
function getCategoryIcon(category) {
    const icons = {
        'Housing': 'home',
        'Food': 'restaurant',
        'Transport': 'directions_car',
        'Transportation': 'directions_car',
        'Utilities': 'power',
        'Entertainment': 'theaters',
        'Other': 'more_horiz'
    };
    
    return icons[category] || 'more_horiz';
}

// Function to handle keyboard visibility
function handleKeyboardVisibility() {
    // On mobile, when keyboard is active, the viewport height decreases
    const viewportHeight = window.innerHeight;
    const formElements = document.querySelectorAll('.form-group input:focus, .form-group select:focus');
    
    if (formElements.length > 0) {
        // A form element is focused, adjust UI if keyboard is likely visible
        if (viewportHeight < 500) { // Threshold for keyboard visibility
            document.body.classList.add('keyboard-visible');
        } else {
            document.body.classList.remove('keyboard-visible');
        }
    }
}

// Utility function to format date for goal deadline
function formatDeadline(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

// Utility function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 