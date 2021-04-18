const { createLink } = require("../src/resolvers");
require("dotenv").config();
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

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

  it("should throw an error when url does not include http or https ", () => {
    return expect(
      createLink({ url: "google.com" })
    ).to.eventually.be.rejectedWith(
      "The url needs to have either http:// or https://"
    );
  });

  it("should successfully create a short Url", () => {
    return expect(
      createLink({
        url: "https://www.google.com",
      })
    ).to.eventually.have.property("shortUrl");
  });
});