class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message); // Call the parent constructor with the message
        this.statusCode = statusCode;
        this.data = null;  // Consistent with ApiResponse
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack; // Use custom stack trace if provided
        } else {
            Error.captureStackTrace(this, this.constructor); // Capture default stack trace
        }
    }
}

export { ApiError };
