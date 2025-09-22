import express  from "express";
import colors from "colors";
import router from "./routes/router";
import productsRouter from "./routes/productsRouter";
import db from "./config/db";

// Database conection
async function connectDB() {
  try {
    await db.authenticate();
    db.sync()
    console.log(colors.blue.bold("Database successfully connected"))
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("There was an error connecting to the database"))
  }
}

connectDB()

const server = express();

// To read form values
server.use(express.json())

server.use('/api/products', productsRouter);
server.use('/api', router)

export default server;