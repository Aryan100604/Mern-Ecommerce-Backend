import jwt from "jsonwebtoken";
const JWT_Secret = "dnsoivnsdo";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_Secret);
  if (!decodedToken) {
    return res.status(400).json({ message: "User is not authorized" });
  }
  req.role = decodedToken.role;
  next();
};
const authorize = (req, res, next) => {
  if (req.role === "admin") {
    return next();
  }
  return res
    .status(400)
    .json({ message: "User is not authorized need to admin" });
};

export { authenticate, authorize };
