import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (payload, expiresIn, secret) => {
  return jwt.sign(payload, secret, { expiresIn });
};
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
const verifyOtp = (otp, otpToken) => {
  console.log("OTP:", otp, "OTP Token:", otpToken);

  try {
    const decoded = verifyToken(otpToken, config.JWT_SECRET_BIDDER);
    console.log("Decoded Token:", decoded);

    if (decoded.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    return decoded;
  } catch (error) {
    console.log("Error in verifyOtp:", error.message);
    throw new Error("Invalid OTP or token");
  }
};
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export { generateToken, verifyOtp, generateOtp, verifyToken };
