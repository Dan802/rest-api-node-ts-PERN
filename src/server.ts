import express  from "express";
import colors from "colors";
import cors, {CorsOptions} from "cors";
import morgan from 'morgan';
import productsRouter from "./routes/productsRouter";
import db from "./config/db";

// Database conection
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync()
    // console.log(colors.blue.bold("Database successfully connected"))
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("There was an error connecting to the database"))
  }
}

connectDB()

const server = express();

// Enable cors 
const corsOptions : CorsOptions = {
  origin: function (origin, callback) {
    
    // If you do not want to block REST tools or server-to-server requests, 
    // add a !origin check 
    if( origin === process.env.FRONTEND_URL || !origin){
      callback(null, true) // Allow the connection
    } else {
      callback(new Error("CORS error"))
      console.log(colors.red.bold("CORS error, Don't allow connection --server.ts--"))
    }
  }
}

server.use(cors(corsOptions))

// To read form values
server.use(express.json())

// HTTP request logger middleware for node.js
server.use(morgan('dev'))

server.use('/api/products', productsRouter);

// works with test.
server.get("/api", (req, res) => {
  res.json({msg: "Desde Api"})
})

export default server;