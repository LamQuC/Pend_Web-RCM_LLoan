document.addEventListener('DOMContentLoaded', function () {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const profileTab = document.getElementById('profileTab');

    const loginContent = document.getElementById('loginContent');
    const registerContent = document.getElementById('registerContent');
    const profileContent = document.getElementById('profileContent');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const refreshProfileBtn = document.getElementById('refreshProfileBtn');

    // Tab switching functionality
    loginTab.addEventListener('click', function () {
        activateTab(loginTab, loginContent);
    });

    registerTab.addEventListener('click', function () {
        activateTab(registerTab, registerContent);
    });

    profileTab.addEventListener('click', function () {
        activateTab(profileTab, profileContent);
        if (isLoggedIn()) {
            validateTokenAndLoadProfile();
        } else {
            showProfileError('Not logged in. Please login first.');
        }
    });

    function activateTab(tab, content) {
        [loginTab, registerTab, profileTab].forEach(t => t.classList.remove('active'));
        [loginContent, registerContent, profileContent].forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        content.classList.add('active');
    }

    // Check if user is logged in
    function isLoggedIn() {
        return localStorage.getItem('token') !== null && localStorage.getItem('username') !== null;
    }

    // Validate token by calling /api/auth/check
    function validateTokenAndLoadProfile() {
        const token = localStorage.getItem('token');
        fetch('/api/auth/check', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    loadUserProfile();
                } else if (response.status === 401) {
                    handleLogout('Session expired. Please login again.');
                } else {
                    throw new Error('Failed to validate token');
                }
            })
            .catch(error => {
                showProfileError('Error validating session. Please login again.');
                console.error(error);
            });
    }

    // Handle login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                showLoginMessage('Login successful!', true);
                loginForm.reset();
                setTimeout(() => {
                    activateTab(profileTab, profileContent);
                    validateTokenAndLoadProfile();
                }, 1000);
            })
            .catch(error => {
                showLoginMessage('Login failed. Please check your credentials.', false);
                console.error(error);
            });
    });

    // Handle register form submission
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                return response.text();
            })
            .then(data => {
                showRegisterMessage(data, true);
                registerForm.reset();
                setTimeout(() => {
                    activateTab(loginTab, loginContent);
                }, 2000);
            })
            .catch(error => {
                showRegisterMessage('Registration failed. Username or email may already be in use.', false);
                console.error(error);
            });
    });

    // Load user profile
    function loadUserProfile() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            showProfileError('Not logged in. Please login first.');
            return;
        }

        fetch(`/api/user?username=${encodeURIComponent(username)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    handleLogout('Session expired. Please login again.');
                    throw new Error('Unauthorized');
                }
                if (!response.ok) {
                    throw new Error('Failed to load user data');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('usernameDisplay').textContent = data.username || 'N/A';
                document.getElementById('emailDisplay').textContent = data.email || 'N/A';
                document.getElementById('createdAtDisplay').textContent = formatDate(data.createdAt);
                document.getElementById('lastLoginDisplay').textContent = data.lastLogin ? formatDate(data.lastLogin) : 'First login';
                showProfileMessage('', false);
            })
            .catch(error => {
                if (error.message !== 'Unauthorized') {
                    showProfileError('Failed to load user data.');
                    console.error(error);
                }
            });
    }

    // Handle logout
    logoutBtn.addEventListener('click', function () {
        handleLogout('Logged out successfully.');
    });

    // Handle refresh profile
    refreshProfileBtn.addEventListener('click', function () {
        if (isLoggedIn()) {
            validateTokenAndLoadProfile();
        } else {
            showProfileError('Not logged in. Please login first.');
        }
    });

    // Helper function to handle logout
    function handleLogout(message) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        document.getElementById('usernameDisplay').textContent = 'Not logged in';
        document.getElementById('emailDisplay').textContent = '-';
        document.getElementById('createdAtDisplay').textContent = '-';
        document.getElementById('lastLoginDisplay').textContent = '-';
        showProfileMessage(message, true);
        setTimeout(() => {
            activateTab(loginTab, loginContent);
        }, 1000);
    }

    // Helper function to show login message
    function showLoginMessage(message, isSuccess) {
        const messageEl = document.getElementById('loginMessage');
        messageEl.classList.remove('success', 'error');
        messageEl.classList.add(isSuccess ? 'success' : 'error');
        messageEl.textContent = message;
    }

    // Helper function to show register message
    function showRegisterMessage(message, isSuccess) {
        const messageEl = document.getElementById('registerMessage');
        messageEl.classList.remove('success', 'error');
        messageEl.classList.add(isSuccess ? 'success' : 'error');
        messageEl.textContent = message;
    }

    // Helper function to show profile message
    function showProfileMessage(message, isSuccess) {
        const messageEl = document.getElementById('profileMessage');
        messageEl.classList.remove('success', 'error');
        if (message) {
            messageEl.classList.add(isSuccess ? 'success' : 'error');
            messageEl.textContent = message;
        } else {
            messageEl.textContent = '';
        }
    }

    // Helper function to format date
    function formatDate(dateString) {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        } catch {
            return '-';
        }
    }

    // Check if user is logged in on page load
    if (isLoggedIn()) {
        profileTab.click();
    }
});