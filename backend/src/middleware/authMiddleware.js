import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // check token exists
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    // remove Bearer
    token = token.split(" ")[1];

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // save user data in request
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Token invalid",
    });
  }
};

export const adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};