export interface PasswordValidation {
    isValid: boolean;
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasDigit: boolean;
    hasSpecialChar: boolean;
}

export const validatePassword = (password: string): PasswordValidation => {
    const minLength = password.length >= 10;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    return {
        isValid: minLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar,
        hasMinLength: minLength,
        hasUppercase: hasUppercase,
        hasLowercase,
        hasDigit,
        hasSpecialChar,
    };
};
// Password match validation
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword && password !== '';
};