import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config() || null;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const connectionString = `mongodb+srv://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

(async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the database....🎉🎉");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

export default mongoose;
