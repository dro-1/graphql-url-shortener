const getLink = async (req, res) => {
  const urlHash = req.params.hash;
  if (urlHash.length !== 6 || !urlHash) {
    return res.status(400).send("Incorrect hash provided");
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
