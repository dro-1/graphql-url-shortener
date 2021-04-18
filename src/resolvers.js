const URL = require("./models");
const crypto = require("crypto");

const createLink = async ({ url }) => {
  if (!url.includes("https://") && !url.includes("http://")) {
    const err = new Error("The url needs to have either http:// or https://");
    throw err;
  }
  const name = `${new Date().toDateString()}`;
  const hash = crypto.createHash("md5").update(name).digest("hex").slice(0, 6);

  const newUrl = new URL({
    url,
    urlHash: hash,
  });

  let savedUrl;

  try {
    savedUrl = await newUrl.save();
  } catch (e) {
    console.log(e);
  }

  return {
    shortUrl: `${process.env.HOST}/short/${savedUrl.urlHash}`,
  };
};

module.exports = {
  createLink,
};
