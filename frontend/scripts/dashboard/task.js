document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    let tasks = [];

    // Load tasks when page loads
    loadTasks();

    // Add new task button click handler
    addTaskBtn.addEventListener('click', () => {
        const taskName = prompt('Enter task name:');
        if (taskName) {
            const priority = prompt('Enter priority (low/medium/high):').toLowerCase();
            addTask({
                id: Date.now(),
                name: taskName,
                priority: priority,
                status: 'active',
                createdAt: new Date().toISOString()
            });
        }
    });

    function addTask(task) {
        // API call to add task
        axios.post('http://localhost:8000/api/v1/tasks', task, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            tasks.push(response.data);
            renderTasks();
            updateStats();
        })
        .catch(error => {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        });
    }

    function loadTasks() {
        // API call to get tasks
        axios.get('http://localhost:8000/api/v1/tasks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            tasks = response.data;
            renderTasks();
            updateStats();
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
            alert('Failed to load tasks. Please try again.');
        });
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }

    function createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item priority-${task.priority}`;
        div.innerHTML = `
            <h3>${task.name}</h3>
            <span class="priority">${task.priority}</span>
            <span class="status">${task.status}</span>
            <div class="task-actions">
                <button onclick="completeTask(${task.id})">Complete</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        return div;
    }

    window.completeTask = function(taskId) {
        axios.patch(`http://localhost:8000/api/v1/tasks/${taskId}`, {
            status: 'completed'
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.status = 'completed';
                renderTasks();
                updateStats();
            }
        })
        .catch(error => {
            console.error('Error completing task:', error);
            alert('Failed to complete task. Please try again.');
        });
    };

    window.deleteTask = function(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            axios.delete(`http://localhost:8000/api/v1/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                tasks = tasks.filter(t => t.id !== taskId);
                renderTasks();
                updateStats();
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                alert('Failed to delete task. Please try again.');
            });
        }
    };

    // Filter buttons functionality
    document.querySelectorAll('.task-filters button').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelector('.task-filters button.active').classList.remove('active');
            e.target.classList.add('active');
            const filter = e.target.textContent.toLowerCase();
            filterTasks(filter);
        });
    });

    function filterTasks(priority) {
        const filteredTasks = priority === 'all' 
            ? tasks 
            : tasks.filter(task => task.priority === priority.toLowerCase());
        renderFilteredTasks(filteredTasks);
    }

    function renderFilteredTasks(filteredTasks) {
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }
});