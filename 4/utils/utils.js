const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const getDecodedTokenFromRequest = (request) => {
  const token = getTokenFrom(request);
  console.log(token);
  if(!token) {
    return null;
  } else {
    return jwt.verify(token, JWT_SECRET);
  }
}

module.exports = {
};
