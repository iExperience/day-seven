class ValidationService {
    constructor() {}

    validateEmail(email) {
        return true;
    }
}

module.exports = ValidationService;

// If you want to export an INSTANCE
// var validationServ = new ValidationService();
// module.exports = validationServ;