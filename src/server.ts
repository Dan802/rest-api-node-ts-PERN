import express  from "express";
import colors from "colors";
import cors, {CorsOptions} from "cors";
import morgan from 'morgan';
import productsRouter from "./routes/productsRouter";
import db from "./config/db";
import swaggerUi from 'swagger-ui-express';
import swaggeSpec, {swaggerUiOptions} from "./config/swagger";

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
  origin: [process.env.FRONTEND_URL],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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

// DOCUMENTATION
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggeSpec, swaggerUiOptions))

export default server;