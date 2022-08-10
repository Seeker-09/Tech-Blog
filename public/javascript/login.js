async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    if(username && password) {
        const resonse = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resonse.ok) {
            document.location.replace('/dashboard/')
        }
        else {
            alert(resonse.statusText)
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler)