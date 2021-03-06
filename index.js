const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");

const productRouter = require("./routes/productRoutes");
const taskRouter = require("./routes/tasks");
const userRouter = require("./routes/users");
const uploadRouter = require("./routes/upload");
const auth = require("./auth");

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    db => {
      console.log("Connected to MongoDB server");
    },
    err => console.log(err)
  );

app.use("/users", userRouter);
app.use("/upload", uploadRouter);
app.use("/products", productRouter);

//app.use("/categories", categoryRouter);
app.use(auth.verifyUser);
app.use("/feedback", taskRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`localhost running at:${process.env.PORT}`);
});
