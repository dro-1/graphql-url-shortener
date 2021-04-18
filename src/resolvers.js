const URL = require("./models");
const crypto = require("crypto");

const createLink = async ({ url }) => {
  if (!url.includes("https://") && !url.includes("http://")) {
    const err = new Error("The url needs to have either http:// or https://");
    throw err;
  }

  let name = `${new Date()}`;
  let hash = crypto.createHash("md5").update(name).digest("hex").slice(0, 6);

  try {
    const checkURL = await URL.findOne({ urlHash: hash });
    if (checkURL) {
      name = `${new Date()}`;
      hash = crypto.createHash("md5").update(name).digest("hex").slice(0, 6);
    }
  } catch (e) {
    throw e;
  }

  const newUrl = new URL({
    url,
    urlHash: hash,
  });

  let savedUrl;

  try {
    savedUrl = await newUrl.save();
  } catch (e) {
    throw e;
  }

  return {
    shortUrl: `${process.env.HOST}/short/${savedUrl.urlHash}`,
  };
};

const hello = () => "Hiiiii";

module.exports = {
  createLink,
  hello,
};
