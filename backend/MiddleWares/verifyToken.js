import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("Decoded Token:", decoded); // 🟢 See what's inside

    req.user = {
      _id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // 🟢 Print exact error
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
