const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const { sampleBlogs } = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = sampleBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Blogs router", () => {
  test("return the right number of blogs", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(res.body).toHaveLength(sampleBlogs.length);
  });
  test("Blogs returned have id field", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const blogs = res.body;
    blogs.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

afterAll(() => {
  mongoose.connection.close();
});
