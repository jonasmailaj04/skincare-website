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
