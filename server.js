import mongoose from "mongoose";
import express from "express";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.hoxuk.mongodb.net/merndb`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("Error connection to database" + err);
  });

//Local Connection
// mongoose
//   .connect(
//     `mongodb://${dbuser}:${dbpass}@localhost:27017/practice?authsource=admin`
//   )
//   .then(() => {
//     app.listen(8080, () => {
//       console.log("Server started");
//     });
//   })
//   .catch((err) => {
//     console.log("Error connection to database" + err);
//   });
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
