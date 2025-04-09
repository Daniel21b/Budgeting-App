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

// Toggle high contrast mode
function toggleHighContrastMode() {
    const htmlElement = document.documentElement;
    const isHighContrast = document.getElementById('high-contrast-toggle').checked;
    
    if (isHighContrast) {
        htmlElement.classList.add('high-contrast-mode');
        localStorage.setItem('highContrastMode', 'enabled');
    } else {
        htmlElement.classList.remove('high-contrast-mode');
        localStorage.setItem('highContrastMode', 'disabled');
    }
}

// Change text size
function changeTextSize(size) {
    console.log(`Text size change requested: ${size}`);
    
    const htmlElement = document.documentElement;
    
    // Remove existing text size classes
    htmlElement.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
    
    // Add selected text size class
    htmlElement.classList.add(`text-size-${size}`);
    
    // Apply to document element so CSS variables propagate to all elements
    if (size === 'small') {
        console.log('Applying small text size (0.85x scale)');
    } else if (size === 'medium') {
        console.log('Applying medium text size (1x scale)');
    } else if (size === 'large') {
        console.log('Applying large text size (1.25x scale)');
    }
    
    // Trigger a reflow to ensure styles are applied immediately
    void htmlElement.offsetHeight;
    
    // Save to local storage
    localStorage.setItem('textSize', size);
    console.log(`Text size preference saved: ${size}`);
    
    // Verify application
    const computedScale = getComputedStyle(htmlElement).getPropertyValue('--font-scale');
    console.log(`Applied font scale: ${computedScale}`);
}

// Load accessibility settings from local storage
function loadAccessibilitySettings() {
    console.log('Loading accessibility settings from local storage');
    
    // Load high contrast setting
    const highContrast = localStorage.getItem('highContrastMode');
    if (highContrast === 'enabled') {
        document.getElementById('high-contrast-toggle').checked = true;
        document.documentElement.classList.add('high-contrast-mode');
        console.log('High contrast mode enabled from saved preferences');
    }
    
    // Load text size setting
    const textSize = localStorage.getItem('textSize') || 'medium';
    console.log(`Loaded text size preference: ${textSize}`);
    
    // Apply the text size class
    document.documentElement.classList.add(`text-size-${textSize}`);
    
    // Make sure the correct radio button is checked
    const radioButton = document.getElementById(`text-size-${textSize}`);
    if (radioButton) {
        radioButton.checked = true;
        console.log(`Radio button for ${textSize} text size checked`);
    } else {
        console.warn(`Could not find radio button for ${textSize} text size`);
    }
    
    // Verify text size application
    const computedScale = getComputedStyle(document.documentElement).getPropertyValue('--font-scale');
    console.log(`Applied font scale on load: ${computedScale}`);
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

// Form Validation Functions
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Add required field indicators
        inputs.forEach(input => {
            const isRequired = input.hasAttribute('required') || input.closest('.form-group')?.hasAttribute('required');
            
            if (isRequired) {
                const label = input.closest('.form-group')?.querySelector('label');
                if (label && !label.innerHTML.includes('*')) {
                    label.innerHTML += ' <span class="required-indicator">*</span>';
                }
                
                // Set required attribute on the input itself
                input.setAttribute('required', 'true');
                
                // Add placeholder with example if not present
                if (!input.getAttribute('placeholder') && input.type !== 'date') {
                    setExamplePlaceholder(input);
                }
            }
        });
        
        // Add validation event listeners
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => validateInput(input, true));
        });
        
        // Prevent submission if validation fails
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showValidationFeedback(form, 'Please fix the errors before submitting');
            } else {
                // Auto-save form data on successful validation
                saveFormData(form);
            }
        });
        
        // Load any saved form data
        loadFormData(form);
    });
}

function validateInput(input, isTyping = false) {
    const value = input.value.trim();
    const inputType = input.type;
    const isRequired = input.hasAttribute('required');
    const formGroup = input.closest('.form-group');
    let isValid = true;
    let errorMessage = '';
    
    // Clear existing validation state
    if (!isTyping) {
        clearValidationState(input);
    }
    
    // Skip validation while typing for empty required fields
    if (isTyping && value === '' && isRequired) {
        return true;
    }
    
    // Validate based on input type and requirements
    if (isRequired && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (value !== '') {
        switch (inputType) {
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'number':
                if (isNaN(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid number';
                }
                break;
                
            case 'date':
                if (new Date(value).toString() === 'Invalid Date') {
                    isValid = false;
                    errorMessage = 'Please enter a valid date';
                }
                break;
                
            default:
                // Check for currency fields (by class or placeholder)
                if (input.classList.contains('currency') || 
                   (input.placeholder && input.placeholder.includes('$'))) {
                    const currencyPattern = /^\$?\d+(\.\d{2})?$/;
                    if (!currencyPattern.test(value.replace('$', ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid currency amount (e.g., 10.99)';
                    }
                }
                break;
        }
    }
    
    // Only update the UI if not typing or if there's an error
    if (!isTyping || !isValid) {
        updateValidationUI(input, isValid, errorMessage);
    }
    
    return isValid;
}

function updateValidationUI(input, isValid, errorMessage) {
    const formGroup = input.closest('.form-group');
    
    if (!formGroup) return;
    
    // Remove existing messages
    const existingError = formGroup.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
    
    const existingSuccess = formGroup.querySelector('.validation-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Update UI based on validation result
    if (isValid) {
        input.classList.remove('invalid-input');
        input.classList.add('valid-input');
        
        // Add success icon
        const successIcon = document.createElement('span');
        successIcon.className = 'validation-success';
        successIcon.innerHTML = '✓';
        formGroup.appendChild(successIcon);
    } else {
        input.classList.remove('valid-input');
        input.classList.add('invalid-input');
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.textContent = errorMessage;
        formGroup.appendChild(errorElement);
    }
}

function clearValidationState(input) {
    const formGroup = input.closest('.form-group');
    
    if (!formGroup) return;
    
    // Remove error/success messages
    const validationMessages = formGroup.querySelectorAll('.validation-error, .validation-success');
    validationMessages.forEach(msg => msg.remove());
    
    // Remove validation classes
    input.classList.remove('valid-input', 'invalid-input');
}

function showValidationFeedback(form, message) {
    // Remove any existing feedback
    const existingFeedback = form.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create and show the feedback message
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback';
    feedback.textContent = message;
    
    // Insert at the top of the form
    form.insertBefore(feedback, form.firstChild);
    
    // Scroll to the feedback
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove the feedback after 5 seconds
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

function setExamplePlaceholder(input) {
    const type = input.type;
    const id = input.id;
    
    // Set placeholder based on input type and id
    if (type === 'number' && id === 'amount') {
        input.placeholder = 'Enter amount (e.g., 10.99)';
    } else if (id === 'transaction' || id.includes('name')) {
        input.placeholder = 'Enter name (e.g., Coffee Shop)';
    } else if (id === 'note') {
        input.placeholder = 'Add a note (optional)';
    } else if (id === 'date') {
        input.placeholder = 'MM/DD/YYYY';
    } else if (id === 'email') {
        input.placeholder = 'example@email.com';
    }
}

// Error Recovery Functions
function setupErrorRecovery() {
    setupUndoFunctionality();
    setupConfirmationDialogs();
}

function setupUndoFunctionality() {
    // Setup undo for bill payments
    const markPaidButtons = document.querySelectorAll('.btn-small');
    markPaidButtons.forEach(btn => {
        const originalOnClick = btn.onclick;
        
        btn.onclick = function(e) {
            e.preventDefault();
            
            const billItem = this.closest('.bill-item');
            const billName = billItem.querySelector('span').textContent.split(' - ')[0];
            
            // Store original state for undo
            const originalState = {
                element: billItem,
                html: billItem.innerHTML,
                name: billName
            };
            
            // Call original handler
            originalOnClick.call(this);
            
            // Show undo option
            showUndoOption('Marked as paid', function() {
                // Restore original state
                billItem.innerHTML = originalState.html;
                
                // Re-attach event listeners
                const newBtn = billItem.querySelector('.btn-small');
                newBtn.onclick = originalOnClick;
                
                showNotification(`Undid payment for ${billName}`);
            });
        };
    });
}

function setupConfirmationDialogs() {
    // Add confirmation for large transactions
    const transactionForms = document.querySelectorAll('.expense-form');
    
    transactionForms.forEach(form => {
        const submitButton = form.querySelector('.submit-btn');
        const originalOnSubmit = form.onsubmit;
        
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const amountInput = this.querySelector('#amount');
            if (amountInput && parseFloat(amountInput.value) >= 100) {
                // Large transaction, show confirmation
                showConfirmationDialog(
                    'Confirm Large Transaction',
                    `Are you sure you want to record $${amountInput.value}?`,
                    () => {
                        // User confirmed, proceed with original submission
                        if (originalOnSubmit) {
                            originalOnSubmit.call(this, e);
                        } else {
                            this.submit();
                        }
                    }
                );
            } else {
                // Regular transaction, proceed normally
                if (originalOnSubmit) {
                    originalOnSubmit.call(this, e);
                } else {
                    this.submit();
                }
            }
        };
    });
}

function showConfirmationDialog(title, message, onConfirm, onCancel) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    
    // Create dialog
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    
    // Set content
    dialog.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="dialog-buttons">
            <button class="dialog-btn dialog-cancel">Cancel</button>
            <button class="dialog-btn dialog-confirm">Confirm</button>
        </div>
    `;
    
    // Add to DOM
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    // Setup button handlers
    dialog.querySelector('.dialog-confirm').onclick = function() {
        document.body.removeChild(overlay);
        if (onConfirm) onConfirm();
    };
    
    dialog.querySelector('.dialog-cancel').onclick = function() {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
    };
}

function showUndoOption(message, undoAction) {
    // Create undo notification
    const undoNotification = document.createElement('div');
    undoNotification.className = 'undo-notification';
    
    undoNotification.innerHTML = `
        <span class="undo-message">${message}</span>
        <button class="undo-button">Undo</button>
    `;
    
    // Add to DOM
    document.body.appendChild(undoNotification);
    
    // Setup undo button
    undoNotification.querySelector('.undo-button').onclick = function() {
        if (undoAction) undoAction();
        document.body.removeChild(undoNotification);
    };
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(undoNotification)) {
            document.body.removeChild(undoNotification);
        }
    }, 5000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function simulateNetworkError(retryAction) {
    const errorDialog = document.createElement('div');
    errorDialog.className = 'error-dialog';
    
    errorDialog.innerHTML = `
        <div class="error-content">
            <h3>Connection Error</h3>
            <p>We couldn't connect to our servers. Your data has been saved locally.</p>
            <div class="error-buttons">
                <button class="error-btn retry-btn">Retry</button>
                <button class="error-btn dismiss-btn">Continue in Offline Mode</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(errorDialog);
    
    errorDialog.querySelector('.retry-btn').onclick = function() {
        document.body.removeChild(errorDialog);
        if (retryAction) retryAction();
    };
    
    errorDialog.querySelector('.dismiss-btn').onclick = function() {
        document.body.removeChild(errorDialog);
        showNotification('Working in offline mode. Data will sync when connection is restored.');
    };
}

// Contextual Help Features
function setupContextualHelp() {
    addTooltips();
    setupUserOnboarding();
    setupSmartTips();
}

function addTooltips() {
    const tooltipData = {
        'amount': 'Enter the exact amount of your transaction',
        'category': 'Categorize your transaction for better budget tracking',
        'transaction-type': 'Select whether you\'re recording income or an expense',
        'date': 'When the transaction occurred',
        'frequency': 'How often this transaction repeats',
        'high-contrast-toggle': 'Changes colors for better visibility',
        'text-size-medium': 'Adjusts the size of text throughout the app'
    };
    
    // Add tooltip icons next to labels
    for (const [id, text] of Object.entries(tooltipData)) {
        const element = document.getElementById(id);
        if (element) {
            const formGroup = element.closest('.form-group');
            if (formGroup) {
                const label = formGroup.querySelector('label');
                if (label) {
                    const tooltipIcon = document.createElement('span');
                    tooltipIcon.className = 'tooltip-icon';
                    tooltipIcon.innerHTML = '?';
                    tooltipIcon.dataset.tooltip = text;
                    
                    label.appendChild(tooltipIcon);
                }
            }
        }
    }
    
    // Add global event delegation for tooltips
    document.body.addEventListener('mouseenter', function(e) {
        const target = e.target;
        if (target.classList.contains('tooltip-icon')) {
            showTooltip(target, target.dataset.tooltip);
        }
    }, true);
    
    document.body.addEventListener('mouseleave', function(e) {
        const target = e.target;
        if (target.classList.contains('tooltip-icon')) {
            hideTooltip();
        }
    }, true);
}

function showTooltip(element, text) {
    // Remove any existing tooltips
    hideTooltip();
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    // Position near the element
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
    
    // Add to DOM
    document.body.appendChild(tooltip);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        document.body.removeChild(tooltip);
    }
}

// Function to setup onboarding
function setupUserOnboarding() {
    // Set the onboarding as completed immediately to prevent showing the welcome screen
    localStorage.setItem('onboardingCompleted', 'true');
    // No longer showing the onboarding overlay on first visit
}

function setupSmartTips() {
    // Setup context-sensitive tips
    const tipContexts = {
        'reports-screen': {
            message: 'Navigate between reports using the dots or buttons',
            delay: 2000
        },
        'manage-budget-screen': {
            message: 'Adjust your budget categories to better manage your finances',
            delay: 1500
        },
        'add-expense-screen': {
            message: 'Categorize expenses to track your spending patterns',
            delay: 1500
        }
    };
    
    // Show tips when navigating to relevant screens
    const originalNavigate = window.navigate;
    
    window.navigate = function(screen) {
        originalNavigate(screen);
        
        // Check if there's a tip for this screen
        if (tipContexts[screen + '-screen']) {
            setTimeout(() => {
                showSmartTip(tipContexts[screen + '-screen'].message);
            }, tipContexts[screen + '-screen'].delay);
        }
    };
}

function showSmartTip(message) {
    // Remove any existing tips
    const existingTip = document.querySelector('.smart-tip');
    if (existingTip) {
        document.body.removeChild(existingTip);
    }
    
    // Create the tip
    const tip = document.createElement('div');
    tip.className = 'smart-tip';
    
    tip.innerHTML = `
        <div class="tip-content">
            <span class="tip-icon">💡</span>
            <span class="tip-message">${message}</span>
        </div>
        <button class="tip-dismiss">×</button>
    `;
    
    // Add to DOM
    document.body.appendChild(tip);
    
    // Setup dismiss button
    tip.querySelector('.tip-dismiss').addEventListener('click', () => {
        document.body.removeChild(tip);
    });
    
    // Auto-dismiss after 8 seconds
    setTimeout(() => {
        if (document.body.contains(tip)) {
            tip.classList.add('tip-fade-out');
            setTimeout(() => {
                if (document.body.contains(tip)) {
                    document.body.removeChild(tip);
                }
            }, 500);
        }
    }, 8000);
}

// Data Persistence Functions
function saveFormData(form) {
    const formId = form.closest('.empty-screen')?.id || 'unknown-form';
    const formData = {};
    
    // Collect all input values
    form.querySelectorAll('input, select, textarea').forEach(input => {
        if (input.id) {
            formData[input.id] = input.value;
        }
    });
    
    // Save to localStorage
    localStorage.setItem(`form-data-${formId}`, JSON.stringify(formData));
}

function loadFormData(form) {
    const formId = form.closest('.empty-screen')?.id || 'unknown-form';
    const savedData = localStorage.getItem(`form-data-${formId}`);
    
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            
            // Fill in saved values
            for (const [id, value] of Object.entries(formData)) {
                const input = form.querySelector(`#${id}`);
                if (input) {
                    input.value = value;
                }
            }
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }
}

// Data modeling and persistence
const BudgetDataManager = {
    data: {
        transactions: [],
        budgets: {},
        goals: [],
        bills: []
    },
    
    init() {
        this.loadData();
        window.addEventListener('beforeunload', () => this.saveData());
    },
    
    loadData() {
        try {
            // Load from localStorage
            const savedData = localStorage.getItem('budgetAppData');
            if (savedData) {
                this.data = JSON.parse(savedData);
                this.updateUI();
            } else {
                // Initialize with default values
                this.data = {
                    transactions: [
                        { id: 1, name: 'Starbucks', amount: 15, category: 'Food', date: new Date().toISOString(), time: '2h ago' },
                        { id: 2, name: 'Uber', amount: 30, category: 'Transport', date: new Date().toISOString(), time: '5h ago' }
                    ],
                    budgets: {
                        'Food & Dining': { allocated: 400, spent: 320 },
                        'Transportation': { allocated: 200, spent: 150 },
                        'Utilities': { allocated: 300, spent: 300 },
                        'Entertainment': { allocated: 150, spent: 100 }
                    },
                    goals: [
                        { id: 1, name: 'House Down Payment', target: 20000, current: 13000, icon: '🏠' },
                        { id: 2, name: 'Vacation Fund', target: 3000, current: 900, icon: '✈️' }
                    ],
                    bills: [
                        { id: 1, name: 'Electricity Bill', amount: 120, dueDate: '2023-05-15', icon: '💡', paid: false },
                        { id: 2, name: 'Internet Bill', amount: 40, dueDate: '2023-05-20', icon: '📶', paid: false },
                        { id: 3, name: 'Car Insurance', amount: 140, dueDate: '2023-05-12', icon: '🚗', paid: false },
                        { id: 4, name: 'Phone Bill', amount: 40, dueDate: '2023-05-25', icon: '📱', paid: false }
                    ]
                };
                this.saveData();
            }
        } catch (error) {
            console.error('Error loading budget data:', error);
        }
    },
    
    saveData() {
        try {
            localStorage.setItem('budgetAppData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving budget data:', error);
            // Show offline mode notification
            simulateNetworkError(() => this.saveData());
        }
    },
    
    updateUI() {
        this.updateTransactions();
        this.updateBudgets();
        this.updateGoals();
        this.updateBills();
    },
    
    updateTransactions() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;
        
        // Clear existing transactions
        activityList.innerHTML = '';
        
        // Add transactions (most recent first)
        this.data.transactions.slice(0, 5).forEach(transaction => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            item.innerHTML = `
                <div class="activity-amount">$${transaction.amount}</div>
                <div class="activity-details">
                    <div class="activity-name">${transaction.name}</div>
                    <div class="activity-category">${transaction.category}</div>
                </div>
                <div class="activity-time">${transaction.time}</div>
            `;
            
            activityList.appendChild(item);
        });
    },
    
    updateBudgets() {
        // Update budget categories
        const categoryItems = document.querySelectorAll('.category-budget-item');
        categoryItems.forEach(item => {
            const categoryName = item.querySelector('.category-name').textContent;
            const input = item.querySelector('.budget-input');
            if (input && this.data.budgets[categoryName]) {
                input.value = this.data.budgets[categoryName].allocated;
            }
        });
        
        // Update budget progress
        this.updateBudgetProgress();
    },
    
    updateBudgetProgress() {
        // Calculate total budget and spending
        let totalAllocated = 0;
        let totalSpent = 0;
        
        for (const category in this.data.budgets) {
            totalAllocated += this.data.budgets[category].allocated;
            totalSpent += this.data.budgets[category].spent;
        }
        
        // Update balance amount
        const balanceAmount = document.querySelector('.balance-amount');
        if (balanceAmount) {
            const remaining = totalAllocated - totalSpent;
            balanceAmount.textContent = `$${remaining}`;
        }
        
        // Update progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const percentage = (totalSpent / totalAllocated) * 100;
            progressBar.style.width = `${percentage}%`;
        }
        
        // Update progress label
        const progressLabel = document.querySelector('.progress-label');
        if (progressLabel) {
            const percentage = Math.round((totalSpent / totalAllocated) * 100);
            progressLabel.textContent = `You've spent ${percentage}% of your budget`;
        }
    },
    
    updateGoals() {
        const goalsList = document.querySelector('.goals-list');
        if (!goalsList) return;
        
        // Clear and rebuild goals list
        goalsList.innerHTML = '';
        
        this.data.goals.forEach(goal => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            
            const item = document.createElement('div');
            item.className = 'goal-item';
            
            item.innerHTML = `
                <div class="goal-header">
                    <span class="goal-icon">${goal.icon}</span>
                    <h3>${goal.name}</h3>
                </div>
                <div class="goal-progress">
                    <div class="progress-bar" style="width: ${percentage}%"></div>
                    <span class="progress-text">$${goal.current} / $${goal.target}</span>
                </div>
                <button class="edit-goal-btn">Edit Goal</button>
            `;
            
            goalsList.appendChild(item);
            
            // Re-attach event listener
            item.querySelector('.edit-goal-btn').addEventListener('click', function() {
                alert(`Edit ${goal.name} coming soon!`);
            });
        });
    },
    
    updateBills() {
        const billsContainer = document.querySelector('#bills-screen .manage-budget-grid');
        if (!billsContainer) return;
        
        // Clear and rebuild bills list
        billsContainer.innerHTML = '';
        
        this.data.bills.forEach(bill => {
            if (!bill.paid) {
                const item = document.createElement('div');
                item.className = 'bill-item';
                
                item.innerHTML = `
                    <span>${bill.icon} ${bill.name} - $${bill.amount}</span>
                    <button class="btn-small" onclick="markBillPaid('${bill.name}')">Mark as Paid</button>
                `;
                
                billsContainer.appendChild(item);
            }
        });
    },
    
    addTransaction(transaction) {
        // Generate ID and add time
        transaction.id = Date.now();
        transaction.time = 'Just now';
        
        // Add to data
        this.data.transactions.unshift(transaction);
        
        // Update UI
        this.updateTransactions();
        
        // Update budget spent amount
        if (transaction.category && this.data.budgets[transaction.category]) {
            this.data.budgets[transaction.category].spent += parseFloat(transaction.amount);
            this.updateBudgetProgress();
        }
        
        // Save data
        this.saveData();
        
        return transaction.id;
    },
    
    updateBudgetCategory(category, amount) {
        if (this.data.budgets[category]) {
            this.data.budgets[category].allocated = parseFloat(amount);
        } else {
            this.data.budgets[category] = { 
                allocated: parseFloat(amount), 
                spent: 0 
            };
        }
        
        this.updateBudgetProgress();
        this.saveData();
    },
    
    markBillPaid(billName) {
        const bill = this.data.bills.find(b => b.name === billName);
        if (bill) {
            const originalPaidStatus = bill.paid;
            bill.paid = true;
            
            // Update UI
            this.updateBills();
            this.saveData();
            
            // Return undo function
            return () => {
                bill.paid = originalPaidStatus;
                this.updateBills();
                this.saveData();
            };
        }
        return null;
    }
};

// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app');
    
    // Initialize navigation
    navigate('home');
    
    // Update time
    updateTime();
    setInterval(updateTime, 60000);
    
    // Initialize BudgetDataManager for data persistence
    BudgetDataManager.init();
    
    // Initialize new features
    setupFormValidation();
    setupErrorRecovery();
    setupContextualHelp();
    
    try {
        // Load accessibility settings
        loadAccessibilitySettings();
        
        // Add event listener for high contrast toggle
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        if (highContrastToggle) {
            highContrastToggle.addEventListener('change', toggleHighContrastMode);
            console.log('High contrast toggle event listener added');
        } else {
            console.warn('High contrast toggle element not found');
        }
        
        // Add event listeners for text size options
        const textSizeOptions = document.querySelectorAll('input[name="text-size"]');
        if (textSizeOptions.length > 0) {
            console.log(`Found ${textSizeOptions.length} text size option elements`);
            
            textSizeOptions.forEach(option => {
                option.addEventListener('change', function() {
                    if (this.checked) {
                        console.log(`Text size option selected: ${this.value}`);
                        try {
                            changeTextSize(this.value);
                        } catch (error) {
                            console.error(`Error changing text size to ${this.value}:`, error);
                        }
                    }
                });
            });
            console.log('Text size radio button event listeners added');
        } else {
            console.warn('No text size option elements found');
        }
    } catch (error) {
        console.error('Error initializing accessibility features:', error);
    }
    
    // Override markBillPaid function to use data manager
    window.markBillPaid = function(billName) {
        const undoFunction = BudgetDataManager.markBillPaid(billName);
        alert(`✅ ${billName} bill marked as paid!`);
        
        // Show undo option
        if (undoFunction) {
            showUndoOption(`${billName} marked as paid`, undoFunction);
        }
    };
    
    // Add Expense Form Handler
    const expenseForms = document.querySelectorAll('.expense-form');
    expenseForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if form is valid (already handled by validation)
            
            // Create transaction object
            const transaction = {
                type: this.querySelector('#transaction-type')?.value || 'expense',
                name: this.querySelector('#transaction')?.value || 'Unnamed Transaction',
                amount: parseFloat(this.querySelector('#amount')?.value || 0),
                category: this.querySelector('#category')?.value || 'Other',
                date: this.querySelector('#date')?.value || new Date().toISOString().split('T')[0],
                note: this.querySelector('#note')?.value || ''
            };
            
            // Add transaction to data manager
            const id = BudgetDataManager.addTransaction(transaction);
            
            // Show success notification
            showNotification('Transaction saved successfully!');
            
            // Navigate back
            const screenId = this.closest('.empty-screen').id;
            if (screenId === 'add-expense-screen') {
                navigate('manage-budget');
            } else if (screenId === 'add-transaction-screen') {
                navigate('goals');
            } else if (screenId === 'recurring-transaction-screen') {
                navigate('goals');
            }
        });
    });
    
    // Budget Changes Handler
    const saveBudgetBtn = document.querySelector('.budget-categories-list + .submit-btn');
    if (saveBudgetBtn) {
        saveBudgetBtn.addEventListener('click', function() {
            const categories = document.querySelectorAll('.category-budget-item');
            
            // Update budget data
            Array.from(categories).forEach(category => {
                const categoryName = category.querySelector('.category-name').textContent;
                const amount = parseFloat(category.querySelector('.budget-input').value);
                
                BudgetDataManager.updateBudgetCategory(categoryName, amount);
            });
            
            showNotification('Budget changes saved successfully!');
            navigate('manage-budget');
        });
    }
    
    // Add New Goal Handler
    const addGoalBtn = document.querySelector('.add-goal-btn');
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', function() {
            // Here you would typically show a form to add a new goal
            showConfirmationDialog(
                'Add New Goal',
                'This feature is coming soon! Would you like to be notified when it\'s available?',
                () => {
                    showNotification('You\'ll be notified when this feature is available');
                }
            );
        });
    }
    
    // Edit Goal Handlers
    const editGoalBtns = document.querySelectorAll('.edit-goal-btn');
    editGoalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const goalName = this.closest('.goal-item').querySelector('h3').textContent;
            
            // Show edit dialog
            showConfirmationDialog(
                `Edit ${goalName}`,
                'Goal editing is coming soon! Would you like to be notified when it\'s available?',
                () => {
                    showNotification('You\'ll be notified when this feature is available');
                }
            );
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
    
    // Virtual Keyboard Setup
    setupVirtualKeyboard();
});

// Setup Virtual Keyboard functionality
function setupVirtualKeyboard() {
    const alphaKeyboard = document.getElementById('alpha-keyboard');
    const numericKeyboard = document.getElementById('numeric-keyboard');
    const keyboardSpacer = document.querySelector('.keyboard-spacer');
    
    // Track current active input and keyboard
    let currentInput = null;
    let currentKeyboard = null;
    
    // Find all input fields that should use the keyboard
    const textInputs = document.querySelectorAll('input[type="text"], input:not([type]), input[placeholder*="name"], input[placeholder*="note"], input[placeholder*="vendor"]');
    const numberInputs = document.querySelectorAll('input[type="number"], input[placeholder*="amount"], input[placeholder*="$"], input.currency');
    
    // Add focus event listeners for text inputs
    textInputs.forEach(input => {
        input.addEventListener('focus', function() {
            showKeyboard(this, alphaKeyboard);
        });
        
        // Instead of making readonly, we'll use a data attribute to track keyboard state
        // and prevent default behavior in a more controlled way
        input.setAttribute('data-virtual-keyboard', 'true');
        
        // Prevent default keyboard on mobile but allow focus
        input.addEventListener('click', function(e) {
            if (this.getAttribute('data-virtual-keyboard') === 'true') {
                this.focus();
                e.preventDefault(); // Prevent default keyboard on mobile
            }
        });
    });
    
    // Add focus event listeners for number inputs
    numberInputs.forEach(input => {
        input.addEventListener('focus', function() {
            showKeyboard(this, numericKeyboard);
        });
        
        // Use data attribute instead of readonly
        input.setAttribute('data-virtual-keyboard', 'true');
        
        // Prevent default keyboard on mobile but allow focus
        input.addEventListener('click', function(e) {
            if (this.getAttribute('data-virtual-keyboard') === 'true') {
                this.focus();
                e.preventDefault(); // Prevent default keyboard on mobile
            }
        });
    });
    
    // Prevent default keyboard behavior while maintaining focus ability
    document.addEventListener('touchstart', function(e) {
        const target = e.target;
        if (target.matches('input') && target.getAttribute('data-virtual-keyboard') === 'true') {
            // Allow focus but prevent keyboard
            target.focus();
            e.preventDefault();
        }
    }, { passive: false });
    
    // Hide keyboard when clicking outside inputs
    document.addEventListener('click', function(e) {
        if (!e.target.matches('input') && !e.target.closest('.keyboard-container')) {
            hideKeyboard();
        }
    });
    
    // Setup key press handlers for alphanumeric keyboard
    setupKeyPressHandlers(alphaKeyboard);
    
    // Setup key press handlers for numeric keyboard
    setupKeyPressHandlers(numericKeyboard);
    
    // Function to show appropriate keyboard
    function showKeyboard(input, keyboard) {
        // Save reference to current input and keyboard
        currentInput = input;
        
        // Hide any currently visible keyboard
        if (currentKeyboard) {
            currentKeyboard.classList.remove('visible');
        }
        
        // Show the appropriate keyboard
        currentKeyboard = keyboard;
        keyboard.classList.add('visible');
        
        // Show spacer to push content up
        keyboardSpacer.classList.add('visible');
        
        // Add cursor positioning functionality
        setupCursorPositioning(input);
        
        // Get the app content element for scrolling
        const appContent = document.querySelector('.app-content');
        
        // Calculate how much we need to scroll to make the input visible
        // Use the input's position relative to the app content
        const inputRect = input.getBoundingClientRect();
        const appContentRect = appContent.getBoundingClientRect();
        
        // Scroll to make input visible with the keyboard shown
        // Account for the keyboard height by adding extra offset
        setTimeout(() => {
            const keyboardHeight = keyboard.getBoundingClientRect().height;
            const scrollOffset = inputRect.top - appContentRect.top - 80;
            
            if (appContent.scrollHeight > appContent.clientHeight) {
                appContent.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    // Enable cursor positioning within input fields
    function setupCursorPositioning(input) {
        // Create and append a transparent overlay for cursor positioning
        const inputRect = input.getBoundingClientRect();
        let positionOverlay = document.getElementById('cursor-position-overlay');
        
        if (!positionOverlay) {
            positionOverlay = document.createElement('div');
            positionOverlay.id = 'cursor-position-overlay';
            positionOverlay.style.position = 'absolute';
            positionOverlay.style.zIndex = '40';
            positionOverlay.style.backgroundColor = 'transparent';
            // Append to the screen element instead of body
            document.querySelector('.screen').appendChild(positionOverlay);
        }
        
        // Convert global coordinates to be relative to the screen element
        const screenRect = document.querySelector('.screen').getBoundingClientRect();
        
        // Position the overlay over the input, relative to the screen
        positionOverlay.style.left = (inputRect.left - screenRect.left) + 'px';
        positionOverlay.style.top = (inputRect.top - screenRect.top) + 'px';
        positionOverlay.style.width = inputRect.width + 'px';
        positionOverlay.style.height = inputRect.height + 'px';
        positionOverlay.style.display = 'block';
        
        // Handle touch/click on the overlay to position cursor
        positionOverlay.onclick = function(e) {
            // Calculate relative position in the input
            const overlayRect = positionOverlay.getBoundingClientRect();
            const relativeX = e.clientX - overlayRect.left;
            const inputWidth = inputRect.width;
            const textLength = input.value.length;
            
            // Estimate cursor position based on relative X position
            let cursorPos = Math.round((relativeX / inputWidth) * textLength);
            
            // Ensure cursor position is within valid range
            cursorPos = Math.max(0, Math.min(cursorPos, textLength));
            
            // Set the cursor position
            input.focus();
            input.setSelectionRange(cursorPos, cursorPos);
            
            // Hide the overlay after positioning
            positionOverlay.style.display = 'none';
        };
    }
    
    // Function to hide keyboard
    function hideKeyboard() {
        if (currentKeyboard) {
            currentKeyboard.classList.remove('visible');
            currentKeyboard = null;
        }
        
        keyboardSpacer.classList.remove('visible');
        
        // Hide cursor positioning overlay
        const positionOverlay = document.getElementById('cursor-position-overlay');
        if (positionOverlay) {
            positionOverlay.style.display = 'none';
        }
        
        if (currentInput) {
            // Make sure to save any input changes
            const event = new Event('change', { bubbles: true });
            currentInput.dispatchEvent(event);
            
            // Also dispatch blur event to trigger validation
            const blurEvent = new Event('blur', { bubbles: true });
            currentInput.dispatchEvent(blurEvent);
            
            currentInput = null;
        }
    }
    
    // Setup keyboard functionality
    function setupKeyPressHandlers(keyboard) {
        const keys = keyboard.querySelectorAll('.keyboard-key');
        let isUppercase = false;
        
        keys.forEach(key => {
            key.addEventListener('click', function() {
                if (!currentInput) return;
                
                // Visual feedback
                this.classList.add('pressed');
                setTimeout(() => this.classList.remove('pressed'), 150);
                
                const action = this.getAttribute('data-key');
                
                // Handle special keys
                if (action === 'delete') {
                    deleteCharacter();
                } else if (action === 'clear') {
                    clearInput();
                } else if (action === 'enter') {
                    submitInput();
                } else if (action === 'shift') {
                    toggleShift();
                } else if (action === 'symbols') {
                    // Not implemented in this version
                } else {
                    // Regular key - add character to input
                    insertCharacter(isUppercase ? action.toUpperCase() : action);
                }
                
                // Trigger validation if input has changed
                if (action !== 'shift' && action !== 'symbols') {
                    triggerInputEvent();
                }
            });
        });
        
        // Handle key functions
        function insertCharacter(char) {
            const currentValue = currentInput.value;
            const selectionStart = currentInput.selectionStart;
            const selectionEnd = currentInput.selectionEnd;
            
            // Insert character at cursor position
            const newValue = currentValue.substring(0, selectionStart) + char + currentValue.substring(selectionEnd);
            currentInput.value = newValue;
            
            // Move cursor after inserted character
            currentInput.selectionStart = currentInput.selectionEnd = selectionStart + 1;
        }
        
        function deleteCharacter() {
            const currentValue = currentInput.value;
            const selectionStart = currentInput.selectionStart;
            const selectionEnd = currentInput.selectionEnd;
            
            if (selectionStart === selectionEnd) {
                // No selection, delete character before cursor
                if (selectionStart > 0) {
                    const newValue = currentValue.substring(0, selectionStart - 1) + currentValue.substring(selectionEnd);
                    currentInput.value = newValue;
                    currentInput.selectionStart = currentInput.selectionEnd = selectionStart - 1;
                }
            } else {
                // Delete selected text
                const newValue = currentValue.substring(0, selectionStart) + currentValue.substring(selectionEnd);
                currentInput.value = newValue;
                currentInput.selectionStart = currentInput.selectionEnd = selectionStart;
            }
        }
        
        function clearInput() {
            currentInput.value = '';
        }
        
        function submitInput() {
            hideKeyboard();
            
            // If in a form, try to find the submit button and click it
            const form = currentInput.closest('form');
            if (form) {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"], .submit-btn');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        }
        
        function toggleShift() {
            isUppercase = !isUppercase;
            
            // Update key display
            const letterKeys = keyboard.querySelectorAll('.keyboard-key:not(.special)');
            letterKeys.forEach(key => {
                const keyChar = key.getAttribute('data-key');
                if (keyChar && keyChar.length === 1 && keyChar.match(/[a-zA-Z]/)) {
                    key.textContent = isUppercase ? keyChar.toUpperCase() : keyChar.toLowerCase();
                }
            });
            
            // Toggle active state for shift key
            const shiftKey = keyboard.querySelector('.keyboard-key.shift');
            if (shiftKey) {
                if (isUppercase) {
                    shiftKey.classList.add('active');
                } else {
                    shiftKey.classList.remove('active');
                }
            }
        }
        
        function triggerInputEvent() {
            const inputEvent = new Event('input', { bubbles: true });
            currentInput.dispatchEvent(inputEvent);
        }
    }
}