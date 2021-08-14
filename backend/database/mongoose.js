const mongoose = require("mongoose");

const password = process.env.MONGO_ATLAS_PW;
const connectionURL = `mongodb+srv://fatihozkir:${password}@cluster0.nq7w1.mongodb.net/meanStackApp?retryWrites=true&w=majority`;
mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("CONNECTED DATABASE!");
  })
  .catch((err) => {
    console.log("DB Connection Failed!");
  });
