

export const validateSignUp = () => {
    let isValid = true;

    if (fullName.trim() === '') {
        setErrorFName(true);
        isValid = false;
    } else {
        setErrorFName(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setErrorEmail(true);
        isValid = false;
    } else {
        setErrorEmail(false);
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        setErrorPhoneNumber(true);
        isValid = false;
    } else {
        setErrorPhoneNumber(false);
    }

    if (password.length < 6) {
        setErrorPassword(true);
        isValid = false;
    } else {
        setErrorPassword(false);
    }

    if (password !== rePass) {
        setErrorRePass(true);
        isValid = false;
    } else {
        setErrorRePass(false);
    }

    return isValid;
};