import express from "express";
import bodyParser from "body-parser";
import bidderRoutes from "./routes/bidderRoutes.js";
import auctioneerRoutes from "./routes/auctioneerRoutes.js";
import syncDatabase from "./db/index.js";
import config from "./config/config.js";

const app = express();

app.use(bodyParser.json());
app.use("/bidder", bidderRoutes);
app.use("/auctioneer", auctioneerRoutes);

const runServer = () => {
  try {
    syncDatabase();
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log("error", error);
  }
};
runServer();
