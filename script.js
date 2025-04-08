// Handle option selection in survey
function selectOption(option) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
  }
  
  // Navigation handler
  function navigate(screen) {
    // Hide all screens
    const allScreens = document.querySelectorAll('.empty-screen, #welcome-survey');
    allScreens.forEach(screenEl => screenEl.style.display = 'none');
  
    // Show target screen
    const target = document.getElementById(screen + '-screen');
    if (target) {
      target.style.display = 'flex';
    }
  
    // Update nav
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
  
    const activeNav = Array.from(navItems).find(item =>
      item.querySelector('.nav-label').textContent.toLowerCase() === screen ||
      (item.querySelector('.nav-label').textContent === 'Home' && screen === 'home')
    );
    if (activeNav) activeNav.classList.add('active');
  }
  
  // Show Home after skipping survey
  function showEmptyScreen(screen) {
    document.getElementById('welcome-survey').style.display = 'none';
    document.getElementById(screen + '-screen').style.display = 'flex';
  
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    navItems[0].classList.add('active');
  }
  
  // Update clock in status bar
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    document.querySelector('.time').textContent = `${hours}:${minutes} ${ampm}`;
  }
  
  // Init
  document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 60000);
    const recurringForm = document.getElementById('recurring-form');
    recurringForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('recurring-name').value.trim();
      const amount = parseFloat(document.getElementById('recurring-amount').value);
      const frequency = document.getElementById('recurring-frequency').value;
      const startDate = document.getElementById('recurring-start-date').value;
      const notes = document.getElementById('recurring-notes').value.trim();
  
      if (!name || !amount || !frequency || !startDate) {
        alert('Please fill in all required fields.');
        return;
      }
  
      const recurringData = {
        name,
        amount,
        frequency,
        startDate,
        notes,
      };
  
      console.log('📅 Recurring Transaction Saved:', recurringData);
  
      alert("🔁 Recurring transaction set!");
      recurringForm.reset();
      navigate('home');
    });  
  
    const form = document.getElementById('expense-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('expense-name').value.trim();
      const amount = parseFloat(document.getElementById('expense-amount').value);
      const category = document.getElementById('expense-category').value;
      const vendor = document.getElementById('expense-vendor').value.trim();
      const date = document.getElementById('expense-date').value;
      const notes = document.getElementById('expense-notes').value.trim();
      const receiptFile = document.getElementById('receipt').files[0];
  
      if (!name || !amount || !category || !vendor || !date || !receiptFile) {
        alert('Please complete all required fields and upload a receipt.');
        return;
      }
  
      // You could send this data to your backend or localStorage here
      console.log({
        name, amount, category, vendor, date, notes, receiptFile
      });
  
      alert("🎉 Expense added successfully with receipt!");
  
      form.reset();
      navigate('home');
    });
  });
  
  function markBillPaid(billName) {
    alert(`✅ ${billName} bill marked as paid!`);
  }
  