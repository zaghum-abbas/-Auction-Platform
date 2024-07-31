import config from "../config/config.js";
import { createBidder, findAuctioneer } from "../services/dbServices.js";
import sendEmail from "../services/emailService.js";
import { comparePassword, hashPassword } from "../services/passwordBcrypt.js";
import {
  generateOtp,
  generateToken,
  verifyOtp,
  verifyToken,
} from "../services/userServices.js";

const register = async (req, res) => {
  const { email, first_name, last_name } = req.body;
  try {
    const otp = generateOtp();
    await sendEmail("mee", email, "OTP Verification", `Your OTP is ${otp}`);
    const payload = { email, first_name, last_name, otp };
    const token = generateToken(payload, "1d", config.JWT_SECRET_BIDDER);
    return res.status(201).json({ message: "OTP sent to email", token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const verifyUserOtp = async (req, res) => {
  try {
    const { otp, token } = req.body;

    const userData = verifyOtp(otp, token, config.JWT_SECRET_BIDDER);
    const { email, first_name, last_name } = userData;
    const payload = { email, first_name, last_name };
    const newToken = generateToken(payload, "1d", config.JWT_SECRET_BIDDER);

    return res.status(200).json({ message: "OTP verified", token: newToken });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const setUserCredentials = async (req, res) => {
  try {
    const { username, password, token } = req.body;
    const decoded = verifyToken(token, config.JWT_SECRET_BIDDER);
    const { first_name, last_name, email } = decoded;
    const hashedPassword = hashPassword(password);
    const auctioneer = await findAuctioneer(email);
    if (auctioneer) {
      return res.send({ message: "Bidder Already exist", success: false });
    }
    const user = await createBidder({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "User successfully registered", user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findAuctioneer(email);
    if (!user || !comparePassword(password, user)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // if (!user.isVerified) {
    //   return res.status(400).json({ message: "User not verified" });
    // }
    const token = generateToken(
      { id: user.id, role: user.role },
      "1d",
      config.JWT_SECRET_BIDDER
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, verifyUserOtp, setUserCredentials };
