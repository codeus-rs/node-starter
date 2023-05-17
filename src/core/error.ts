class ApiError extends Error {
    public readonly code: number;
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly stack: string | undefined;

    constructor(statusCode: number, code: number, isOperational = true, stack = '') {
        super(code.toString());
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
