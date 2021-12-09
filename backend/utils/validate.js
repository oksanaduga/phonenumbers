const checkCodes = (code) => {
    let codes = ['+7', '+262', '+40'];
    return codes.includes(code.toString())
};

const checkPhone = (phone) => {
    let phoneString =  phone.toString()
    let isValidateLength = phoneString.length > 2 && phoneString.length < 11;
    let isValidateNumbers = /\D/.test(phoneString);
    return isValidateLength && !isValidateNumbers;
};

const validate = (phoneData) => {

    let code = phoneData.code;
    let number = phoneData.phone;

    let IsCodeValidate = checkCodes(code);
    let IsPhoneValidate = checkPhone(number);
    return IsCodeValidate && IsPhoneValidate;

};

module.exports.validate = validate;