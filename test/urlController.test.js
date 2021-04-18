const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { getLink } = require("../src/urlController");

chai.use(chaiAsPromised);

const { expect } = chai;

describe("URL Controller", () => {
  it("goes to 404 handler when hash is incorrect", () => {
    const req = {
      params: {
        hash: "f",
      },
    };

    const res = {
      status: (status) => ({
        send: (message) => ({
          status,
          message,
        }),
      }),
    };

    expect(getLink(req, res)).to.eventually.equal({
      message: "Incorrect hash provided",
      status: 400,
    });
  });

  it("sends a 404 and a corresponding message if hash has no Url", () => {
    const req = {
      params: {
        hash: "dddddd",
      },
    };

    const res = {
      status: (status) => ({
        send: (message) => ({
          status,
          message,
        }),
      }),
    };

    expect(getLink(req, res)).to.eventually.equal({
      message: "The hash supplied doesnt hold any URL",
      status: 404,
    });
  });
});
