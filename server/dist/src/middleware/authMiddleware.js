"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
// Configure JWKS client for your region and user pool ID
const client = (0, jwks_rsa_1.default)({
    jwksUri: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_19NPCTO50/.well-known/jwks.json",
});
// Get signing key from Cognito JWKs
function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key === null || key === void 0 ? void 0 : key.getPublicKey();
        callback(err, signingKey);
    });
}
const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }
        jsonwebtoken_1.default.verify(token, getKey, {}, (err, decoded) => {
            var _a;
            if (err || typeof decoded === "string") {
                console.error("JWT verification failed:", err);
                res.status(401).json({ message: "Invalid or expired token" });
                return;
            }
            const decodedToken = decoded;
            const userRole = ((_a = decodedToken["custom:role"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
            req.user = {
                id: decodedToken.sub,
                role: userRole,
            };
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({ message: "Access is denied to the user" });
                return;
            }
            next();
        });
    };
};
exports.authMiddleware = authMiddleware;
