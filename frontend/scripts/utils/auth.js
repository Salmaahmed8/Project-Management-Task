
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

document.getElementById("register").addEventListener("click", function () {
    // Retrieve input values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Axios POST request to your API
    axios.post('http://localhost:8000/api/v1/register', {
        name: name,
        email: email,
        password: password
    })
    .then(function (response) {
        // Handle successful registration
        console.log("Registration successful:", response.data.message);
        alert("Registration successful! You can now log in.");
        
        // Optionally, redirect to the login page
        window.location = "auth.html";
    })
    .catch(function (error) {
        // Handle errors and display appropriate feedback
        if (error.response) {
            console.error("Error:", error.response.data.message);
            alert(error.response.data.message || "Registration failed. Please try again.");
        } else {
            console.error("Error:", error.message);
            alert("An error occurred. Please try again.");
        }
    });
});


document.getElementById("login").addEventListener("click", function(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    axios.post('http://localhost:8000/api/v1/login',
    {
        "email": email,
        "password": password
    })
    .then(function (response) {
        let token = response.data.token
        localStorage.setItem("token", token)
        console.log("token received", token)
        console.log("Login successful, token received:", token);

        window.location = "dashboard.html";
    }).catch(function (error) {
        // Handle errors and display appropriate feedback
        if (error.response) {
            console.error("Error:", error.response.data.message);
            alert(error.response.data.message || "Login failed. Please try again.");
        } else {
            console.error("Error:", error.message);
            alert("An error occurred. Please try again.");
        }
    });
})