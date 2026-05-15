export const Auth_Rules = {
    name: {
        regex: /[^w]{3,30}/,
        message: 'Please Enter Name Minlength 3 Letter and Maxlength 30 Letter',
    },
    email: {
        regex: /^[A-za-z0-9.]+@(gmail|yahoo|outlook|hotmail)\.com$/,
        message: 'Please Enter Email Valid',
    },
    password: {
        regex: /^.{6,}$/,
        message: 'Please Enter Minlength 6 Letter or Digit',
    }
}

export const Product_Rules = {
  name: {
    regex: /^[A-Z][a-z]{2,15}$/,
    message:
      "Please Name Product Start Letter Uppercase and (2-15) Letter Lowercase",
  },
  price: {
    regex: /^[1-9][0-9]{2,}$/,
    message: "Please Price Product minlengt 3 Digit",
  },
  category: {
    regex: /^(mobile|laptop|tv|watch|tablet)$/,
    message: "Please Choose From: options",
  },
  description: {
    regex: /^.{30,}/,
    message: "Please Must be 30 Letter",
  },
};

export function validateField(field, value) {
    if (!value || value.trim() === '') return 'This input is Required';
    const rule = Product_Rules[field];
    if (rule && !rule.regex.test(value.trim())) return rule.message;
    return null;
}

export function validateAll(fields) {
    const errors = {};
    Object.keys(fields).forEach(key => {
        const error = validateField(key, fields[key]);
        if (error) errors[key] = error;
    });
    return errors;
}


export function validateAuthField(field, value) {
    if (!value || value.trim() === '') return 'This Input is Required';
    const rule = Auth_Rules[field];
    if (rule && !rule.regex.test(value.trim())) return rule.message;
    return null;
}



