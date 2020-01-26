const task = require("../../models/tasks");
const mongoose = require("mongoose");
//connecting with database.....
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

describe("Tasks Schema", () => {
  it("Should add task", async () => {
    let p = {
      name: "Task"
    };
    let h1 = await task.create(p);
    expect(h1.name).toEqual("Task");
  });

  it("should be able to remove all task", async () => {
    const status = await task.deleteMany();
    expect(status.ok).toBe(1);
  });
});
