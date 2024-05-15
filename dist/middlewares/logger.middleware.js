"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
function loggerMiddleware(req, res, next) {
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();
    console.log(`Executing GlobalMiddleware: Route ${req.url} accessed via ${req.method} method, on ${date} at ${time}.`);
    next();
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map