document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.querySelector('#loginForm .error-message');
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
        sessionStorage.setItem('loggedInUser', email);
        window.location.href = 'dashboard.html';
    } else {
        errorDiv.innerText = 'Invalid email or password.';
    }
});

document.querySelector('.toggle-password').addEventListener('click', function () {
    const password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    } else {
        password.type = "password";
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    }
}); 