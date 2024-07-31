import jwt from "jsonwebtoken";
import { verifyToken } from "../services/userServices";
import config from "../config/config";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = verifyToken(token, config.JWT_SECRET_BIDDER);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { authMiddleware };
