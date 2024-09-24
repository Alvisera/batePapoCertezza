const form = document.getElementById('loginForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;

            localStorage.setItem('username', username);

            window.location.href = '/chat';
        });