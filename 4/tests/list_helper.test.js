const listHelper = require("../utils/list_helper");
const { sampleBlogs } = require("./test_helper");

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has more than one blogs, equals their sum", () => {
    const sum = sampleBlogs.map((blog) => blog.likes).reduce((a, b) => a + b);
    const result = listHelper.totalLikes(sampleBlogs);
    expect(result).toBe(sum);
  });
});

describe("favorite blog", () => {
  test("when only top favourite, return that blog", () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(sampleBlogs);
    expect(result).toEqual(expected);
  });
});

describe("most blogs", () => {
  test("when only one top author with most blogs, return that author", () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(sampleBlogs);
    expect(result).toEqual(expected);
  });
});

describe("most likes", () => {
  test("when only one top author with most likes, return that author", () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = listHelper.mostLikes(sampleBlogs);
    expect(result).toEqual(expected);
  });
});
