const Validation = {
    isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    isPasswordValid(password) {
        return password.length >= 6;
    },

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    },

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(element => {
            element.style.display = 'none';
        });
    }
};