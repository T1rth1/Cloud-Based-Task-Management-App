const routeNotFound = (req,res,next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}
// this is the error middlware if any error is there from the backend the it send the particular error from this functions
const errorHandler = (err,req,res,next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message:message,
        stack:process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export { routeNotFound, errorHandler};