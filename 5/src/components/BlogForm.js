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
          title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
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
