// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Login Function
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', username);
            window.location.href = 'index.html'; // Redirect to main page
        } else {
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Signup Function
async function signup() {
    const userId = document.getElementById('userId').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!userId || !username || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, username, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Signup successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Signup failed: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}