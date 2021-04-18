const getLink = async (req, res) => {
  const urlHash = req.params.hash;
  if (!urlHash) {
    res.send("No hash was supplied");
  }
  const url = await URL.findOne({ urlHash });
  if (!url) {
    res.send("The hash supplied doesnt hold any URL");
  }
  res.redirect(url.url);
};

module.exports = {
  getLink,
};
