const mongoose = require("mongoose");

const dbConnector = (callback) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("DB Connected");
      callback();
    });
};

module.exports = dbConnector;
