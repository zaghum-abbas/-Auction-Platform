import Auctioneer from "../models/auctioneer.js";
import Bidder from "../models/bidder.js";

const createBidder = async (userData) => {
  const user = new Bidder(userData);
  await user.save();
  return user;
};
const createAuctioneer = async (userData) => {
  const user = new Auctioneer(userData);
  await user.save();
  return user;
};

const findBidder = (email) => {
  return Bidder.findOne({ where: { email } });
};
const findAuctioneer = (email) => {
  return Auctioneer.findOne({ where: { email } });
};
const setUsernameAndPassword = async (email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Bidder.findOneAndUpdate(
    { email },
    { username, password: hashedPassword, isVerified: true },
    { new: true }
  );
  return user;
};

export {
  createBidder,
  findBidder,
  findAuctioneer,
  setUsernameAndPassword,
  createAuctioneer,
};
