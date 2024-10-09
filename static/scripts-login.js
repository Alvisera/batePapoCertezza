const form = document.getElementById('loginForm');
form.addEventListener('submit', function(event) {   
    event.preventDefault();
    const username = document.getElementById('username').value;
    const usernameBeforeAt = username.split('.')[0];
    const formattedUsername = usernameBeforeAt.charAt(0).toUpperCase() + usernameBeforeAt.slice(1);

    localStorage.setItem('username', formattedUsername);

    window.location.href = '/telainicial';
});
