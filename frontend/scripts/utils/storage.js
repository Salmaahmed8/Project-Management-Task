const Storage = {
    getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    },

    saveUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },

    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    },

    clearCurrentUser() {
        localStorage.removeItem('currentUser');
    }
};