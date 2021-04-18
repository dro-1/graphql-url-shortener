const { createLink } = require("./../resolvers");
require("dotenv").config();
const mongoose = require("mongoose");
const expect = require("chai").expect;

jest.setTimeout(10000);

describe("Testing the resolvers", () => {
  beforeAll((done) => {
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

  test("should throw an error when url does not include http or https ", () => {
    expect.assertions(1);
    return createLink({ url: "google.com" }).catch((e) => {
      expect(e).toEqual(
        new Error("The url needs to have either http:// or https://")
      );
    });
  });

  test("should successfully create a short Url", () => {
    expect.assertions(1);
    return createLink({ url: "https://www.google.com" }).then((result) => {
      expect(result).toHaveProperty("shortUrl");
    });
  });
});
