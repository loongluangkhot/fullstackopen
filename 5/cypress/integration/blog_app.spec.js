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
          const postfixes = [0, 1, 2, 3];
          postfixes.forEach((postfix) => {
            let b = {
              title: `${blog.title}-${postfix}`,
              author: `${blog.author}-${postfix}`,
              url: `${blog.url}-${postfix}`,
              likes: postfix,
            };
            cy.request({
              method: "POST",
              url: "http://localhost:3003/api/blogs",
              body: b,
              headers,
            });
          });
          cy.visit("http://localhost:3000");
        });
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();
        cy.contains("title").parent().find("input").type("title-test");
        cy.contains("author").parent().find("input").type("author-test");
        cy.contains("url").parent().find("input").type("url-test");
        cy.get("button").contains("create").click();
        cy.contains("a new blog title-test by author-test added", {
          matchCase: false,
        });
        cy.get(".blog")
          .contains("title-test author-test")
          .parent()
          .contains("view");
      });

      it("Logged in user can like a post", function () {
        cy.contains("title-0 author-0").parent().parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").find("button").contains("like").click();
        cy.get("@blog").contains("likes 1");
      });

      it("A blog can be deleted by its creator", function () {
        cy.contains("title-0 author-0").parent().parent().as("blog");
        cy.get("@blog").contains("view").click();
        cy.get("@blog").find("button").contains("remove").click();
        cy.contains("title-0 author-0").should("not.exist");
      });

      it("A blog cannot be deleted by someone that isn't the creator", function () {
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "username2",
          password: "password2",
        }).then((response) => {
          const user = response.body;
          localStorage.setItem("user", JSON.stringify(user));
          cy.visit("http://localhost:3000");
          cy.contains("title-0 author-0").parent().as("blog");
          cy.get("@blog").contains("view").click();
          cy.get("@blog").find("button").contains("remove").should("not.exist");
        });
      });

      it("Blogs are ordered according to likes", function () {
        cy.get(".blog-view-button").then(($e) => {
          $e.map((i, e) => {
            cy.wrap(e).click();
          });
        });
        cy.get(".blog-likes").then(($e) => {
          const likesArr = $e.toArray().map((e) => {
            return e.innerText;
          });
          const sorted = [...likesArr].sort().reverse();
          likesArr.forEach((val, i) => {
            cy.wrap(val).should("equals", sorted[i]);
          });
        });
        cy.contains("title-2").parent().parent().find("button").contains("like").as("likeBlog2");
        cy.get("@likeBlog2").click();
        cy.get("@likeBlog2").click();
        cy.get(".blog-title-author").then(($e) => {
          const topBlogLabel = $e.toArray()[0].innerText;
          console.log(topBlogLabel);
          cy.wrap(topBlogLabel).should("contains", "title-2 author-2");
        });
      });
    });
  });
});
