const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((a, b) => {
    return a.likes < b.likes ? b : a;
  });
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const recordMap = {};
  const mostBlogsAuthor = {
    author: undefined,
    blogs: undefined,
  };
  blogs.forEach((blog) => {
    const author = blog.author;
    if (recordMap[author] === undefined) {
      recordMap[author] = 1;
    } else {
      recordMap[author] += 1;
    }

    if (mostBlogsAuthor.author === undefined) {
      mostBlogsAuthor.author = author;
      mostBlogsAuthor.blogs = recordMap[author];
    } else {
      if (mostBlogsAuthor.blogs < recordMap[author]) {
        mostBlogsAuthor.author = author;
        mostBlogsAuthor.blogs = recordMap[author];
      }
    }
  });
  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const recordMap = {};
  const mostLikesAuthor = {
    author: undefined,
    likes: undefined,
  };
  blogs.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;
    if (recordMap[author] === undefined) {
      recordMap[author] = likes;
    } else {
      recordMap[author] += likes;
    }

    if (mostLikesAuthor.author === undefined) {
      mostLikesAuthor.author = author;
      mostLikesAuthor.likes = recordMap[author];
    } else {
      if (mostLikesAuthor.likes < recordMap[author]) {
        mostLikesAuthor.author = author;
        mostLikesAuthor.likes = recordMap[author];
      }
    }
  });
  return mostLikesAuthor;
  return true;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
