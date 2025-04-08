document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Update history state
            window.history.pushState({tabId: tabId}, tabId);
        });
    });

    // Handle keyboard visibility
    const inputFields = document.querySelectorAll('input, select, textarea');
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            // Add padding to ensure field is visible when keyboard appears
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    // Handle back button navigation
    window.addEventListener('popstate', function(event) {
        // If back button is pressed, stay within the app but navigate to previous tab
        // (if a history state is available)
        if (event.state && event.state.tabId) {
            activateTab(event.state.tabId);
        } else {
            // Default to dashboard if no history state
            activateTab('Dashboard');
        }
        event.preventDefault();
    });

    // Initialize history state with current tab
    window.history.replaceState({tabId: 'Dashboard'}, 'Dashboard');
});

// Utility function to activate a specific tab
function activateTab(tabId) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

loadTasks();

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;
    
    li.addEventListener('click', function(e) {
        if (e.target !== closeBtn) {
            this.classList.toggle('checked');
            saveTasks();
        }
    });
    
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '×';
    closeBtn.className = 'close';
    closeBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });
    
    li.appendChild(closeBtn);
    taskList.appendChild(li);
    

    newTaskInput.value = '';
    

    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    
    taskItems.forEach(item => {
        tasks.push({
            text: item.textContent.replace('×', '').trim(),
            completed: item.classList.contains('checked')
        });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            
            if (task.completed) {
                li.classList.add('checked');
            }
            
            
            li.addEventListener('click', function(e) {
                if (e.target !== closeBtn) {
                    this.classList.toggle('checked');
                    saveTasks();
                }
            });
            
           
            const closeBtn = document.createElement('span');
            closeBtn.textContent = '×';
            closeBtn.className = 'close';
            closeBtn.addEventListener('click', function() {
                li.remove();
                saveTasks();
            });
            
            li.appendChild(closeBtn);
            taskList.appendChild(li);
        });
    }
}

const profileImage = document.getElementById('profile-image');
const notification = document.getElementById('notification');
const closeNotificationBtn = document.getElementById('close-notification');

profileImage.addEventListener('click', function() {
    notification.style.display = 'block';
});

closeNotificationBtn.addEventListener('click', function() {
    notification.style.display = 'none';
});

const submitChoicesBtn = document.getElementById('submit-choices');
const choicesResult = document.getElementById('choices-result');

submitChoicesBtn.addEventListener('click', function() {
    const selectedRadio = document.querySelector('input[name="option"]:checked');
    const selectedDropdown = document.getElementById('dropdown').value;
    
    let resultText = 'Your choices: ';
    
    if (selectedRadio) {
        resultText += selectedRadio.value;
    } else {
        resultText += 'No radio option selected';
    }
    
    resultText += ' and ';
    
    if (selectedDropdown) {
        resultText += selectedDropdown;
    } else {
        resultText += 'No dropdown option selected';
    }
    
    choicesResult.textContent = resultText;
    choicesResult.style.display = 'block';
});

if (!localStorage.getItem('tasks')) {
    const sampleTasks = [
        { text: 'Register for classes', completed: true },
        { text: 'Start Phase 1.1.1', completed: true },
        { text: 'Start Phase 1.1.2', completed: true },
        { text: 'Start Phase 1.2', completed: true },
        { text: 'Complete Phase 1.1.1', completed: true },
        { text: 'Complete Phase 1.1', completed: false },
        { text: 'Complete Phase 1.2', completed: false }
    ];
    
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    loadTasks();
} 