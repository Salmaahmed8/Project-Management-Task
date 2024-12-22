function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = totalTasks - completedTasks;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('inProgressTasks').textContent = inProgressTasks;
    document.getElementById('activeTaskCount').textContent = inProgressTasks;
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', function() {
    // Load user info
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
    }

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../pages/auth.html';
        return;
    }

    // Set up axios default headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});

// Add this to your dashboard's script section
window.onload = function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Load user data
    axios.get('http://localhost:8000/api/v1/user/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        const user = response.data;
        document.getElementById('userName').textContent = user.name;
        localStorage.setItem('currentUser', JSON.stringify(user));
    })
    .catch(error => {
        console.error('Error loading user profile:', error);
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            window.location.href = 'auth.html';
        }
    });
};