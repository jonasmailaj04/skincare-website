function validateStrongPassword(password) {
    let errors = []
    
    if (password.length < 8) {
        errors.push('Password must have at least 8 characters')
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number')
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character')
    }
    
    return errors
}

function getSignupFormErrors(firstname, email, password, repeatPassword, firstname_input, email_input, password_input, repeat_password_input) {
    let errors = []

    if( firstname === '' || firstname == null){
        errors.push('Firstname is required')
        if (firstname_input) firstname_input.parentElement.classList.add('incorrect')
    }

    if( email === '' || email == null){
        errors.push('email is required')
        if (email_input) email_input.parentElement.classList.add('incorrect')
    }

    if( password === '' || password == null){
        errors.push('password is required')
        if (password_input) password_input.parentElement.classList.add('incorrect')
    } else {
        const passwordErrors = validateStrongPassword(password)
        if (passwordErrors.length > 0) {
            errors.push(...passwordErrors)
            if (password_input) password_input.parentElement.classList.add('incorrect')
        }
    }

    if(password !== repeatPassword){
        errors.push('Password does not match repeated password')
        if (password_input) password_input.parentElement.classList.add('incorrect')
        if(repeat_password_input) {
            repeat_password_input.parentElement.classList.add('incorrect')
        }
    }

    return errors;
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form')
    if (!form) return
    
    const firstname_input = document.getElementById('firstname-input')
    const email_input = document.getElementById('email-input')
    const password_input = document.getElementById('password-input')
    const repeat_password_input = document.getElementById('repeat-password-input')
    const error_message = document.getElementById('error-message')

    if (!error_message) return

    error_message.style.display = 'block'
    error_message.style.color = '#f06272'
    error_message.style.marginBottom = '1rem'
    error_message.style.minHeight = '1.5rem'

    form.addEventListener('submit', (e) => {
        let errors = []

        if(firstname_input){
            errors = getSignupFormErrors(
                firstname_input.value, 
                email_input.value, 
                password_input.value, 
                repeat_password_input ? repeat_password_input.value : '',
                firstname_input,
                email_input,
                password_input,
                repeat_password_input
            )
        }
        else{
            errors = getLoginFormErrors(
                email_input.value, 
                password_input.value,
                email_input,
                password_input
            )
        }
        
        if(errors.length > 0){
            e.preventDefault()
            error_message.innerText = errors.join(". ")
            error_message.style.display = 'block'
        } else {
            error_message.style.display = 'none'
            e.preventDefault()
            error_message.style.color = '#4CAF50'
            error_message.innerText = firstname_input ? 'Signup successful! Redirecting...' : 'Login successful! Redirecting...'
            error_message.style.display = 'block'
            
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 1000)
        }
    })
