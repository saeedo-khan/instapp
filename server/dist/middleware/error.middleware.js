"use strict";
exports.__esModule = true;
exports.notFoundHandler = exports.globalErrorHandler = void 0;
var globalErrorHandler = function (err, req, res, next) {
    var status = err.status || 500;
    var message = err.message || "Something went wrong";
    var data = err.data || null;
    res.status(status).json({
        type: "error",
        message: message,
        data: data
    });
};
exports.globalErrorHandler = globalErrorHandler;
var notFoundHandler = function (err, req, res, next) {
    var error = {
        status: 404,
        message: "API endpoint does not exist"
    };
    next(error);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=error.middleware.js.map