import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware to handle CORS POLICY (Cross-Origin Resource Sharing)
// option1: allow all origins with default of cors(*)
//app.use(cors());

// option2: allow custom origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send("MERN Stack project")
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });