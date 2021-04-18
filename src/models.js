const { Schema, model } = require("mongoose");

const urlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    urlHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const URL = model("URL", urlSchema);

module.exports = URL;
