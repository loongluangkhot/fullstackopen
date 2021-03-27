const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const { sampleUsers, usersInDb } = require("./test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const users = sampleUsers.map((user) => new User(user));
  const promiseArray = users.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe("Invalid users are not created", () => {
  test("Username is not unique", async () => {
    const user = {
      name: "new",
      password: "new",
    };
    user.username = sampleUsers[0].username;
    const res = await api.post("/api/users").send(user).expect(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toContain("expected `username` to be unique");

    const users = await usersInDb();
    expect(users.length).toBe(sampleUsers.length);
  });
  test("Username is less than 3 characters long", async () => {
    const user = {
      name: "new",
      username: "ne",
      password: "new",
    };
    const res = await api.post("/api/users").send(user).expect(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe("Username must be at least 3 characters long");

    const users = await usersInDb();
    expect(users.length).toBe(sampleUsers.length);
  });
  test("Password is less than 3 characters long", async () => {
    const user = {
      name: "new",
      username: "new",
      password: "ne",
    };
    const res = await api.post("/api/users").send(user).expect(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe("Password must be at least 3 characters long");

    const users = await usersInDb();
    expect(users.length).toBe(sampleUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
