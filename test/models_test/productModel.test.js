const product = require("../../models/productModel");
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

describe("Product Schema", () => {
  it("Should add Product", async () => {
    let p = {
      productname: "Oneplus",
      productprice: "100",
      productspecification: "Great",
      productratings: "4"
    };
    let h1 = await product.create(p);
    expect(h1.productname).toEqual("Oneplus", "100", "Great", "4");
  });

  it("Should be able to remove all product", async () => {
    const status = await product.deleteMany();
    expect(status.ok).toBe(1);
  });
});
