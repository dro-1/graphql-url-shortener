const crypto = require("crypto");
const URL = require("./models");

const shortenURL = async ({ url }) => {
  const urlRegex =
    "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
  const regex = new RegExp(urlRegex, "i");
  if (
    (!url.includes("https://") && !url.includes("http://")) ||
    !regex.test(url)
  ) {
    const err = new Error(
      "You must enter a valid url with either http or https"
    );
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

  return `${process.env.HOST}/short/${savedUrl.urlHash}`;
};

module.exports = {
  shortenURL,
};
