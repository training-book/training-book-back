function sendSuccessResponse(res, successInstance) {
    if (successInstance.data !== null) {
      return res.status(successInstance.statusCode).json({
        successCode: successInstance.successCode,
        message: successInstance.message,
        data: successInstance.data
      });
    } else {
      return res.status(successInstance.statusCode).json({
        successCode: successInstance.successCode,
        message: successInstance.message
      });
    }
  }
  
module.exports = sendSuccessResponse;