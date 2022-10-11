const validate = {
  login: (email, password) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const minPasswordLength = 6;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= minPasswordLength;

    return isEmailValid && isPasswordValid;
  },
  register: (name, email, password) => {
    const minNameLength = 12;
    const minPasswordLength = 6;
    const isNameValid = name.length >= minNameLength;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= minPasswordLength;

    return isNameValid && isEmailValid && isPasswordValid;
  },
};

export default validate;
