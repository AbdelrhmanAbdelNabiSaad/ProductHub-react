export const Auth_Rules = {
    name: {
        regex: /^[\p{L} ]{3,30}$/u,
        message: 'Name must be 3 to 30 letters',
    },
    email: {
        regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
        message: 'Please enter a valid email address',
    },
    password: {
        regex: /^.{6,}$/,
        message: 'Password must be at least 6 characters',
    }
}

export const Product_Rules = {
  name: {
    regex: /^[A-Z][A-Za-z0-9 -]{1,14}$/,
    message:
      "Product name must start with a capital letter and be 2 to 15 characters (letters, digits, spaces or hyphens)",
  },
  price: {
    regex: /^[1-9][0-9]{2,}$/,
    message: "Price must be a whole number with at least 3 digits",
  },
  category: {
    regex: /^(mobile|laptop|tv|watch|tablet)$/,
    message: "Please choose a category from the list",
  },
  description: {
    regex: /^[\s\S]{30,}$/,
    message: "Description must be at least 30 characters",
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



