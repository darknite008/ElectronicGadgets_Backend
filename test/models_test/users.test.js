const users = require("../../models/users");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/test";

beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Users Schema", () => {
  it("Should add Users", async () => {
    let p = {
      firstName: "Om",
      lastName: "Thapa",
      username: "darknite",
      password: "123456"
    };
    let h1 = await users.create(p);
    expect(h1.firstName).toEqual("Om", "Thapa", "darknite", "123456");
  });

  it("Should be able to remove all product", async () => {
    const status = await users.deleteMany();
    expect(status.ok).toBe(1);
  });
});
