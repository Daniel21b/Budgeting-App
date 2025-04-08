let incomeList = [];
let expenseList = [];
let savingsGoals = [];

// Add Income Item
function addIncome() {
    const incomeContainer = document.createElement('div');
    incomeContainer.classList.add('income-entry');
    incomeContainer.innerHTML = `
      <input type="number" placeholder="Amount" class="income-amount">
      <select class="income-frequency">
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <hr>
    `;
    document.getElementById('income-list').appendChild(incomeContainer);
  }
  
  // Submit Income and Update Budget
  function submitIncome() {
    const incomeElements = document.querySelectorAll('.income-entry');
    let allFilled = true;
  
    // Clear any previous error message
    document.getElementById('income-error').textContent = '';
  
    incomeElements.forEach(income => {
      const amount = parseFloat(income.querySelector('.income-amount').value) || 0;
      const frequency = income.querySelector('.income-frequency').value;
  
      if (amount === 0 || frequency === '') {
        allFilled = false;
      } else {
        allFilled = true
        // Store income if valid
        incomeList.push({ amount, frequency });
  
        // Clear the input after submission
        income.querySelector('.income-amount').value = '';
        income.querySelector('.income-frequency').value = 'monthly';
      }
    });
  
    if (!allFilled) {
      document.getElementById('income-error').textContent = "Please fill out all fields.";
      return; // Prevent further actions
    }
  
    updateBudgetResults();
  }
  
  // Add Expense Item
  function addExpense() {
    const expenseContainer = document.createElement('div');
    expenseContainer.classList.add('expense-entry');
    expenseContainer.innerHTML = `
      <input type="text" placeholder="Expense Name" class="expense-name">
      <input type="number" placeholder="Amount" class="expense-amount">
      <select class="expense-frequency">
        <option value="one-time">One-Time</option>
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <hr>
    `;
    document.getElementById('expense-list').appendChild(expenseContainer);
  }
  
  // Submit Expense and Update Budget
  function submitExpense() {
    const expenseElements = document.querySelectorAll('.expense-entry');
    let allFilled = true;
  
    // Clear any previous error message
    document.getElementById('expense-error').textContent = '';
  
    expenseElements.forEach(expense => {
      const name = expense.querySelector('.expense-name').value || '';
      const amount = parseFloat(expense.querySelector('.expense-amount').value) || 0;
      const frequency = expense.querySelector('.expense-frequency').value;
  
      if (name === '' || amount === 0 || frequency === '') {
        allFilled = false;
      } else {
        allFilled = true
        // Store expense if valid
        expenseList.push({ name, amount, frequency });
  
        // Clear the input after submission
        expense.querySelector('.expense-name').value = '';
        expense.querySelector('.expense-amount').value = '';
        expense.querySelector('.expense-frequency').value = 'monthly';
      }
    });
  
    if (!allFilled) {
      document.getElementById('expense-error').textContent = "Please fill out all fields.";
      return; // Prevent further actions
    }
  
    updateBudgetResults();
  }
  
  // Add Savings Goal Item
  function addSavingsGoal() {
    const savingsContainer = document.createElement('div');
    savingsContainer.classList.add('savings-entry');
    savingsContainer.innerHTML = `
      <input type="text" placeholder="Goal Name" class="goal-name">
      <input type="number" placeholder="Goal Amount" class="goal-amount">
      <input type="number" placeholder="Months to Save" class="goal-months">
      <hr>
    `;
    document.getElementById('savings-list').appendChild(savingsContainer);
  }
  
  // Submit Savings Goal and Update Budget
  function submitSavingsGoal() {
    const savingsElements = document.querySelectorAll('.savings-entry');
    let allFilled = true;
  
    // Clear any previous error message
    document.getElementById('savings-error').textContent = '';
  
    savingsElements.forEach(goal => {
      const goalName = goal.querySelector('.goal-name').value || '';
      const goalAmount = parseFloat(goal.querySelector('.goal-amount').value) || 0;
      const monthsToSave = parseInt(goal.querySelector('.goal-months').value) || 0;
  
      if (goalName === '' || goalAmount === 0 || monthsToSave === 0) {
        allFilled = false;
      } else {
        // Store savings goal if valid
        allFilled = true
        savingsGoals.push({ goalName, goalAmount, monthsToSave });
  
        // Clear the input after submission
        goal.querySelector('.goal-name').value = '';
        goal.querySelector('.goal-amount').value = '';
        goal.querySelector('.goal-months').value = '';
      }
    });
  
    if (!allFilled) {
      document.getElementById('savings-error').textContent = "Please fill out all fields.";
      return; // Prevent further actions
    }
  
    updateBudgetResults();
  }
  
  // Update Budget Results
  function updateBudgetResults() {
    let totalIncome = 0;
    let totalExpenses = 0;
    let savingsAllocated = 0;
  
    // Calculate total income (converted to monthly)
    incomeList.forEach(income => {
      const amount = income.amount;
      const frequency = income.frequency;
  
      if (frequency === 'weekly') totalIncome += amount * 4;
      else if (frequency === 'bi-weekly') totalIncome += amount * 2;
      else totalIncome += amount; // Monthly
    });
  
    // Calculate total expenses (converted to monthly)
    expenseList.forEach(expense => {
      const amount = expense.amount;
      const frequency = expense.frequency;
  
      if (frequency === 'weekly') totalExpenses += amount * 4;
      else if (frequency === 'bi-weekly') totalExpenses += amount * 2;
      else totalExpenses += amount; // Monthly
    });
  
    // Calculate savings goal contributions
    savingsGoals.forEach(goal => {
      const goalAmount = goal.goalAmount;
      const monthsToSave = goal.monthsToSave;
  
      const monthlySaving = goalAmount / monthsToSave;
      savingsAllocated += monthlySaving;
    });
  
    const remainingBudget = totalIncome - totalExpenses - savingsAllocated;
  
    // Update UI with calculated values
    document.getElementById('monthly-income').textContent = totalIncome.toFixed(2);
    document.getElementById('monthly-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('remaining-budget').textContent = remainingBudget.toFixed(2);
    document.getElementById('savings-allocated').textContent = savingsAllocated.toFixed(2);
  
    // Show the budget results
    document.getElementById('budget-results').style.display = 'block';
    document.getElementById('empty-screen').style.display = 'none';
  }
  // Reset Budget to 0s
function resetBudget() {
    // Clear the lists of income, expenses, and savings goals
    incomeList = [];
    expenseList = [];
    savingsGoals = [];
  
    // Clear any error messages
    document.getElementById('income-error').textContent = '';
    document.getElementById('expense-error').textContent = '';
    document.getElementById('savings-error').textContent = '';
  
    // Reset the input fields and lists on the screen
    document.getElementById('income-list').innerHTML = '';
    document.getElementById('expense-list').innerHTML = '';
    document.getElementById('savings-list').innerHTML = '';
  
    // Reset the budget results on the screen
    document.getElementById('monthly-income').textContent = '0.00';
    document.getElementById('monthly-expenses').textContent = '0.00';
    document.getElementById('remaining-budget').textContent = '0.00';
    document.getElementById('savings-allocated').textContent = '0.00';
  
    // Show the empty screen and hide the budget results
    document.getElementById('budget-results').style.display = 'none';
    document.getElementById('empty-screen').style.display = 'block';
  }
  
  
