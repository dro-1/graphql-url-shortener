const { getLink } = require("./../src/urlController");
const URL = require("./../src/models");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("URL Controller", () => {
  it("sends a 400 and no hash response when hash is incorrect", () => {
    const req = {
      params: {
        hash: "",
      },
    };

    const res = {
      status: (status) => ({
        send: (message) => {
          status, message;
        },
      }),
    };

    expect(getLink(req, res)).to.eventually.equal({
      message: "Incorrect hash provided",
      status: 400,
    });
  });

  it("sends a 404 and a corresponding message if shortUrl has no Url", () => {
    const req = {
      params: {
        hash: "dddddd",
      },
    };

    const res = {
      status: (status) => ({
        send: (message) => {
          status, message;
        },
      }),
    };

    expect(getLink(req, res)).to.eventually.equal({
      message: "The hash supplied doesnt hold any URL",
      status: 404,
    });
  });
});
