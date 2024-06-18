class AppSuccess {
    constructor(successCode, statusCode, message, data = null){
        this.successCode= successCode;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

module.exports = AppSuccess;