let incomeList = [];
let expenseList = [];
let savingsGoals = [];

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
    <button class="btn btn-outline" onclick="removeIncome(this)">Remove</button>
  `;
  document.getElementById('income-list').appendChild(incomeContainer);
}

function removeIncome(button) {
  button.parentElement.remove();
}

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
    <button class="btn btn-outline" onclick="removeExpense(this)">Remove</button>
  `;
  document.getElementById('expense-list').appendChild(expenseContainer);
}

function removeExpense(button) {
  button.parentElement.remove();
}

function addSavingsGoal() {
  const savingsContainer = document.createElement('div');
  savingsContainer.classList.add('savings-entry');
  savingsContainer.innerHTML = `
    <input type="text" placeholder="Goal Name" class="goal-name">
    <input type="number" placeholder="Goal Amount" class="goal-amount">
    <input type="number" placeholder="Months to Save" class="goal-months">
    <button class="btn btn-outline" onclick="removeSavingsGoal(this)">Remove</button>
  `;
  document.getElementById('savings-list').appendChild(savingsContainer);
}

function removeSavingsGoal(button) {
  button.parentElement.remove();
}

function calculateBudget() {
    let totalIncome = 0;
    let totalExpenses = 0;
  
    // Calculate total income (converted to monthly)
    const incomeElements = document.querySelectorAll('.income-entry');
    incomeElements.forEach(income => {
      const amount = parseFloat(income.querySelector('.income-amount').value) || 0;
      const frequency = income.querySelector('.income-frequency').value;
  
      if (frequency === 'weekly') totalIncome += amount * 4;
      else if (frequency === 'bi-weekly') totalIncome += amount * 2;
      else totalIncome += amount; // Monthly
    });
  
    // Calculate total expenses (converted to monthly)
    const expenseElements = document.querySelectorAll('.expense-entry');
    expenseElements.forEach(expense => {
      const amount = parseFloat(expense.querySelector('.expense-amount').value) || 0;
      const frequency = expense.querySelector('.expense-frequency').value;
  
      if (frequency === 'weekly') totalExpenses += amount * 4;
      else if (frequency === 'bi-weekly') totalExpenses += amount * 2;
      else totalExpenses += amount; // Monthly
    });
  
    // Calculate savings goal contributions
    let savingsAllocated = 0;
    const savingsElements = document.querySelectorAll('.savings-entry');
    savingsElements.forEach(goal => {
      const goalAmount = parseFloat(goal.querySelector('.goal-amount').value) || 0;
      const monthsToSave = parseInt(goal.querySelector('.goal-months').value) || 0;
  
      const monthlySaving = goalAmount / monthsToSave;
      savingsAllocated += monthlySaving;
    });
  
    const remainingBudget = totalIncome - totalExpenses - savingsAllocated;
  
    // Update UI with calculated values
    document.getElementById('monthly-income').textContent = totalIncome.toFixed(2);
    document.getElementById('monthly-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('remaining-budget').textContent = remainingBudget.toFixed(2);
    document.getElementById('savings-allocated').textContent = savingsAllocated.toFixed(2);
  
    // Handle warnings
    const budgetWarning = document.getElementById('budget-warning');
    if (remainingBudget < 0) {
      budgetWarning.textContent = 'Warning: You are running a deficit!';
    } else if (remainingBudget < 200) {
      budgetWarning.textContent = 'Warning: Your budget is below $200!';
    } else {
      budgetWarning.textContent = '';
    }
  
    // Make sure the results section is visible and scrollable
    document.querySelector('.budget-results').style.display = 'block';
  }
  
  
