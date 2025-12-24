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
