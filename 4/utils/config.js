require("dotenv").config();

let MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
  // MONGODB_URI = process.env.MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
};
