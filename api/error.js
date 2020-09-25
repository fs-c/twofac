const UserError = exports.UserError = class {
	constructor(userMessage, statusCode = 500, message = userMessage) {
	    this.code = statusCode;
		this.message = userMessage;

		this.success = false;
	}

	static consolidate(original, newError) {
	    return new UserError(original.message || newError.message,
		original.status || newError.status, newError.message);
	}
}
    