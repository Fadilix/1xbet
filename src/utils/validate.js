const ERROR_MESSAGES = {
    required: " est obligatoire",
    passwordLength: "Doit contenir au moins 6 caractères",
    specialCharacter: "Doit contenir un caractère spécial",
};

function validate(values) {
    const errors = {};
    if (!values.password) {
        errors.password = `Le mot de passe ${ERROR_MESSAGES.required}`;
    } else if (values.password.length < 6 || !/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(values.password)) {
        errors.password = `${ERROR_MESSAGES.passwordLength} et ${ERROR_MESSAGES.specialCharacter}`;
    } else {
        errors.password = "";
    }
    errors.nom = values.nom ? "" : `Le nom${ERROR_MESSAGES.required}`;
    errors.contact = values.contact ? "" : `Le numéro de téléphone${ERROR_MESSAGES.required}`;

    return errors;
}

export default validate;
