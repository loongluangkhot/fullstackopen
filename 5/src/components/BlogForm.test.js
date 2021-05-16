import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("createBlog is called with the right details when a new blog is created", () => {
    const createBlog = jest.fn();
    const component = render(<BlogForm createBlog={createBlog} />);
    const form = component.container.querySelector("form");

    const titleInput = component.getByLabelText("title");
    const authorInput = component.getByLabelText("author");
    const urlInput = component.getByLabelText("url");

    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.change(authorInput, { target: { value: "author" } });
    fireEvent.change(urlInput, { target: { value: "url" } });

    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    const arg = createBlog.mock.calls[0][0];
    expect(arg.title).toBe("title");
    expect(arg.author).toBe("author");
    expect(arg.url).toBe("url");
  });
});
