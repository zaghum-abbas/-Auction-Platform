import sequelize from "./config.js";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default syncDatabase;
