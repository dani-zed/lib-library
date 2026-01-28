import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // use .env in production

// ✅ Verify any logged-in user
export const verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token",token);
  
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user info in req
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Allow only authors
export const isAuthor = (req, res, next) => {
  if (req.user.role !== "author")
    return res.status(403).json({ message: "Author access required" });
  next();
};