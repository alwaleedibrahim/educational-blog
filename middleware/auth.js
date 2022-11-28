const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (e) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

module.exports = auth;
