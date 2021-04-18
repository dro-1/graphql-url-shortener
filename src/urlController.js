const URL = require("./models");

const getLink = async (req, res, next) => {
  const urlHash = req.params.hash;
  if (urlHash.length !== 6 || !urlHash) {
    next();
  }

  const url = await URL.findOne({ urlHash });
  if (!url) {
    return res.status(404).send("The hash supplied doesnt hold any URL");
  }
  return res.redirect(url.url);
};

module.exports = {
  getLink,
};
