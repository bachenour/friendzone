const validEmail = (email) => {
    const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegEx.test(email);
}

const validName = (name) => {
    const nameRegEx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegEx.test(name);
}

const validPassword = (password) => {
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegEx.test(password) && password.length >= 8;
}

const validPostalCode = (postalCode) => {
    const postalCodeRegEx = /^[0-9]{5}$/;
    return postalCodeRegEx.test(postalCode);
}

const validAddress = (address) => {
    const addressRegEx = /^[a-zA-Z0-9\s,'-]*$/;
    return addressRegEx.test(address);
}


export { validEmail, validName, validPassword, validPostalCode, validAddress };