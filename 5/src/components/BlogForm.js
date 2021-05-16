import React, { useState } from "react";

export const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setblogUrl] = useState("");

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    await createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            id="author"
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <label htmlFor="url">url</label>
          <input
            id="url"
            type="text"
            value={blogUrl}
            name="URL"
            onChange={({ target }) => setblogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
