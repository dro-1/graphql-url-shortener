require("dotenv").config();
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { shortenURL } = require("../src/resolvers");

chai.use(chaiAsPromised);

const { expect } = chai;

describe("Resolvers", () => {
  before((done) => {
    mongoose
      .connect(process.env.MONGO_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Test DB Connected");
        done();
      });
  });

  it("should throw an error when url is not valid", () =>
    expect(shortenURL({ url: "google.com" })).to.eventually.be.rejectedWith(
      "You must enter a valid url with either http or https"
    ));

  it("should successfully create a short Url that includes the host", () =>
    expect(
      shortenURL({
        url: "https://www.google.com",
      })
    ).to.eventually.include(process.env.HOST));
});
