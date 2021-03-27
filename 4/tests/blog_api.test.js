const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const { sampleBlogs, blogsInDb } = require("./test_helper");
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
  test("Save blog successfully", async () => {
    const newBlog = {
      title: "New Blog",
      author: "James Tan",
      url: "https://medium.com",
      likes: 5,
    };
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blog = res.body;
    expect(blog.title).toBe(newBlog.title);
    expect(blog.author).toBe(newBlog.author);
    expect(blog.url).toBe(newBlog.url);
    expect(blog.likes).toBe(newBlog.likes);
  });
  test("Default likes to zero if not provided", async () => {
    const newBlog = {
      title: "New Blog",
      author: "James Tan",
      url: "https://medium.com",
    };
    const res = await api.post("/api/blogs").send(newBlog);
    const blog = res.body;
    expect(blog.likes).toBe(0);
  });
  test("If title is missing, return 400", async () => {
    const missingTitle = {
      author: "James Tan",
      url: "https://medium.com",
      likes: 5,
    };
    const res = await api.post("/api/blogs").send(missingTitle).expect(400);
    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(sampleBlogs.length);
  });
  test("If url is missing, return 400", async () => {
    const missingUrl = {
      title: "New Blog",
      author: "James Tan",
      likes: 5,
    };
    const res = await api.post("/api/blogs").send(missingUrl).expect(400);
    const blogs = await blogsInDb();
    expect(blogs).toHaveLength(sampleBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
