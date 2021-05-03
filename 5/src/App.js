import React, { useState, useEffect } from "react";
import BlogsContainer from "./components/BlogsContainer";
import { Login } from "./components/Login";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = loginService.getCurrentlyLoginUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    loginService.logout();
    setUser();
  };

  return user ? (
    <BlogsContainer user={user} onLogout={handleLogout} />
  ) : (
    <Login setUser={setUser} />
  );
};

export default App;
