import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

// Configure JWKS client for your region and user pool ID
const client = jwksClient({
  jwksUri: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_19NPCTO50/.well-known/jwks.json",
});

// Get signing key from Cognito JWKs
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    jwt.verify(token, getKey, {}, (err, decoded) => {
      if (err || typeof decoded === "string") {
        console.error("JWT verification failed:", err);
        res.status(401).json({ message: "Invalid or expired token" });
        return;
      }

      const decodedToken = decoded as DecodedToken;
      const userRole = decodedToken["custom:role"]?.toLowerCase() || "";

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
