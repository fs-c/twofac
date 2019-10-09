const UserError = exports.UserError = class extends Error {
    constructor(userMessage, statusCode = 500, message = userMessage) {
        super(message);

        this.statusCode = statusCode;
        this.userMessage = userMessage;
    }

    static consolidate(original, userError) {
        return new UserError(original.userMessage || userError.userMessage,
            original.statusCode || userError.statusCode, userError.message);
    }
}
