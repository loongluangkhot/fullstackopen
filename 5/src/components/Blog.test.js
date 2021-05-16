import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

  beforeEach(() => {
    const updateBlog = jest.fn();
    const removeBlog = jest.fn();
    const blog = {
      user: {
        name: "name",
      },
      likes: 5,
      title: "title",
      author: "author",
      url: "url",
    };
    component = render(
      <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
    );
  });

  test("renders blog's title and author, but not url / number of likes by default", () => {
    const blogElem = component.container.querySelector(".blog");
    expect(blogElem).toHaveTextContent("title");
    expect(blogElem).toHaveTextContent("author");
    expect(blogElem).not.toHaveTextContent("5");
    expect(blogElem).not.toHaveTextContent("url");
  });

  test("renders blog's url & number of likes when 'view' button is clicked ", () => {
    const blogElem = component.container.querySelector(".blog");
    const showBtn = component.getByText("view");
    fireEvent.click(showBtn);

    expect(blogElem).toHaveTextContent("title");
    expect(blogElem).toHaveTextContent("author");
    expect(blogElem).toHaveTextContent("5");
    expect(blogElem).toHaveTextContent("url");
  });
});
