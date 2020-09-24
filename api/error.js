const UserError = exports.UserError = class extends Error {
	constructor(userMessage, statusCode = 500, message = userMessage) {
	    super(message);
    
	    this.statusCode = statusCode;
	    this.userMessage = userMessage;
	}

	static consolidate(original, newError) {
	    return new UserError(original.userMessage || newError.userMessage,
		original.statusCode || newError.statusCode, newError.message);
	}
    }
    