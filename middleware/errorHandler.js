const { ConnectionError, ConnectionRefusedError } = require("sequelize");
const AppError = require("./../utils/AppError");

function errorHandler(err,req,res, next) {
    if(err instanceof ConnectionError || err instanceof ConnectionRefusedError ){
       res.status(500)
       res.json({
        message : "Something went wrong."
       })
    }   

    if(err instanceof AppError){
        res.status(err.statusCode)
        res.json({
            errorCode : err.errorCode,
            message : err.message
        });
    }
}

module.exports = errorHandler;