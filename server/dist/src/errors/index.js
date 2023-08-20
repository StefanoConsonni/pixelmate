"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPixelsError = exports.PixelsError = void 0;
class PixelsError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "PixelsError";
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
    }
}
exports.PixelsError = PixelsError;
const IsPixelsError = (error) => error.statusCode !== undefined;
exports.IsPixelsError = IsPixelsError;
