const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {checkForAuthentication} = require("./middlewares/auth");
const userRouter = require("./routes/user");
const watchListRouter = require("./routes/watchList");
const favouriteRouter = require("./routes/favourite");


const app = express();
const PORT = 8000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cdnl63o.mongodb.net/movix-db?retryWrites=true&w=majority&appName=Cluster0`
  )
  
  .then(console.log("mongodb connected successfully"))
  .catch((error) => console.log("error connecting to mongodb", error));


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);



app.use("/api/auth", userRouter);
app.use("/api/watchlist", watchListRouter);
app.use("/api/favourites", favouriteRouter);



app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));

