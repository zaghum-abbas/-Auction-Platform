import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config.js";
import { v4 as uuid4 } from "uuid";
class Auctioneer extends Model {}

Auctioneer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid4,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "bidder",
    },
  },
  {
    sequelize,
    modelName: "Auctioneer",
    tableName: "Auctioneers",
    timestamps: true,
    hooks: {
      beforeCreate: (auctioneer) => {
        auctioneer.id = uuid4();
      },
    },
  }
);

export default Auctioneer;
