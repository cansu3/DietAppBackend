const catchError = (error, req, res, next) => {
    res.json({message:error.message});
    console.log(error);
} 
module.exports = catchError;