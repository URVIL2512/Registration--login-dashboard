document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        const user = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value.trim(),
            gender: document.querySelector('input[name="gender"]:checked').value,
            dob: document.getElementById('dob').value,
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value,
            skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(el => el.value),
            profilePic: ''
        };
        const reader = new FileReader();
        const profilePicFile = document.getElementById('profilePic').files[0];
        if (profilePicFile) {
            reader.readAsDataURL(profilePicFile);
            reader.onload = function () {
                user.profilePic = reader.result;
                saveUser(user);
            };
        } else {
            saveUser(user);
        }
    }
});

function saveUser(user) {
    localStorage.setItem(user.email, JSON.stringify(user));
    alert('Registration successful!');
    window.location.href = 'login.html';
}

function validateForm() {
    let isValid = true;
    // Full Name
    const fullName = document.getElementById('fullName');
    if (fullName.value.length < 3 || /\d/.test(fullName.value) || /(.)\1\1/.test(fullName.value)) {
        showError(fullName, 'Full Name must be at least 3 characters, no digits, no char repeated 3 times.');
        isValid = false;
    } else {
        clearError(fullName);
    }
    // Email
    const email = document.getElementById('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Enter a valid email address.');
        isValid = false;
    } else {
        clearError(email);
    }
    // Password
    const password = document.getElementById('password');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)) {
        showError(password, 'Min 8 chars, upper, lower, number, special char.');
        isValid = false;
    } else {
        clearError(password);
    }
    // Confirm Password
    const confirmPassword = document.getElementById('confirmPassword');
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }
    // Phone
    const phone = document.getElementById('phone');
    if (!/^\d{10}$/.test(phone.value)) {
        showError(phone, 'Phone must be exactly 10 digits.');
        isValid = false;
    } else {
        clearError(phone);
    }
    // Gender
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        showError(document.getElementsByName('gender')[0], 'Select gender.');
        isValid = false;
    } else {
        clearError(document.getElementsByName('gender')[0]);
    }
    // DOB
    const dob = document.getElementById('dob');
    const today = new Date();
    const birthDate = new Date(dob.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (!dob.value || age < 18) {
        showError(dob, 'Must be 18+ years.');
        isValid = false;
    } else {
        clearError(dob);
    }
    // Address
    const address = document.getElementById('address');
    if (address.value.length < 10) {
        showError(address, 'Address min 10 characters.');
        isValid = false;
    } else {
        clearError(address);
    }
    // City
    const city = document.getElementById('city');
    if (city.value === "") {
        showError(city, 'Select a city.');
        isValid = false;
    } else {
        clearError(city);
    }
    // Skills
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    if (skills.length === 0) {
        showError(document.getElementsByName('skills')[0], 'Select at least one skill.');
        isValid = false;
    } else {
        clearError(document.getElementsByName('skills')[0]);
    }
    // Terms
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showError(terms, 'You must accept the terms.');
        isValid = false;
    } else {
        clearError(terms);
    }
    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    error.innerText = message;
    input.classList.add('error');
}
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message');
    error.innerText = '';
    input.classList.remove('error');
} 