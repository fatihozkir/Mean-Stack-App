const express = require("express");
const app = express();
require("./database/mongoose");
const path = require("path");
const cors = require("./middlewares/cors");

const postRouter = require("./routers/post");
const userRouter = require("./routers/user");

app.use(express.json());
app.use(cors);
app.use("/images", express.static("images"));
app.use(postRouter);
app.use(userRouter);

module.exports = app;
