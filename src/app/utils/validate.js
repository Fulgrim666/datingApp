export function validator(data, config) {
    const errors = {};
    let statusValueValidate;
    function validate(validateMethod, data, config) {
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValueValidate = !data;
                } else {
                    statusValueValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValueValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalLetter": {
                const passwordReg = /[A-Z]+/g;
                statusValueValidate = !passwordReg.test(data);
                break;
            }
            case "isContainDigit": {
                const containDigit = /\d+/g;
                statusValueValidate = !containDigit.test(data);
                break;
            }
            case "min": {
                statusValueValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValueValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
