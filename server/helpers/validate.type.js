export const validateTypes = (toValidate) => {
    const validatorArray = Object.entries(toValidate).map(el => {
        switch (el[1]) {
            case "string":
                return true
            case "number":
                if (/\d/.test(el[0])) {
                    return true
                };
                return false
            case "boolean":
                if (/true|false/.test(el[0])) {
                    return true
                };
                return false
        }
    });
    const result = validatorArray.some(el => el === false);
    return result;
};