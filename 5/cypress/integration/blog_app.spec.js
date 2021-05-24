describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/test/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "username",
      password: "password",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "username2",
      password: "password2",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log into Application");
    cy.get("form")
      .should("contain", "username")
      .and("contain", "password")
      .find("button")
      .should("contain", "login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("username").find("input").type("username");
      cy.contains("password").find("input").type("password");
      cy.get("button").click();
      cy.contains("logged in", { matchCase: false });
    });

    it("fails with wrong credentials", function () {
      cy.contains("username").find("input").type("dummy");
      cy.contains("password").find("input").type("password");
      cy.get("button").click();
      cy.contains("wrong credentials", { matchCase: false }).should(
        "have.css",
        "background-color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("Blog app", function () {
    describe("When logged in", function () {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "username",
          password: "password",
        }).then((response) => {
          const user = response.body;
          localStorage.setItem("user", JSON.stringify(user));
          const token = user.token;
          const headers = { Authorization: `bearer ${token}` };
          const blog = {
            title: "title",
            author: "author",
            url: "blog",
          };
          cy.request({
            method: "POST",
            url: "http://localhost:3003/api/blogs",
            body: blog,
            headers,
          });
          cy.visit("http://localhost:3000");
        });
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();
        cy.contains("title").parent().find("input").type("title2");
        cy.contains("author").parent().find("input").type("author2");
        cy.contains("url").parent().find("input").type("url2");
        cy.get("button").contains("create").click();
        cy.contains("a new blog title2 by author2 added", { matchCase: false });
        cy.get(".blog").contains("title2 author2").contains("view");
      });

      it("Logged in user can like a post", function () {
        cy.contains("title author").parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").find("button").contains("like").click();
        cy.get("@blog").contains("likes 1");
      });

      it("A blog can be deleted by its creator", function () {
        cy.contains("title author").parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").find("button").contains("remove").click();
        cy.contains("title author").should("not.exist");
      });

      it("A blog cannot be deleted by someone that isn't the creator", function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "username2",
          password: "password2",
        }).then((response) => {
          const user = response.body;
          localStorage.setItem("user", JSON.stringify(user));
          cy.visit("http://localhost:3000");
          cy.contains("title author").parent().as("blog");
          cy.get("@blog").contains("view").click();
          cy.get("@blog").find("button").contains("remove").should("not.exist");
        });
      });
    });
  });
});
