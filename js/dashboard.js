window.onload = function() {
    const email = sessionStorage.getItem('loggedInUser');
    if (!email) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('userName').innerText = user.fullName;
    document.getElementById('welcomeName').innerText = user.fullName;
    document.getElementById('fullName').innerText = user.fullName;
    document.getElementById('email').innerText = user.email;
    document.getElementById('phone').innerText = user.phone;
    document.getElementById('gender').innerText = user.gender;
    document.getElementById('dob').innerText = user.dob;
    document.getElementById('address').innerText = user.address;
    document.getElementById('city').innerText = user.city;
    // Profile image
    const profileImage = document.getElementById('profileImage');
    if (user.profilePic) {
        profileImage.innerHTML = `<img src="${user.profilePic}" alt="Profile" />`;
        document.getElementById('userAvatar').innerHTML = `<img src="${user.profilePic}" alt="Avatar" />`;
    } else {
        profileImage.innerHTML = '<span class="placeholder">👤</span>';
        document.getElementById('userAvatar').innerText = user.fullName[0] || 'U';
    }
    // Skills
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    if (user.skills && user.skills.length) {
        user.skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.innerText = skill.toUpperCase();
            skillsList.appendChild(tag);
        });
    }
};

document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});

document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.getElementById('mainContent').classList.toggle('expanded');
}); 