import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const dtoken =
      req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    // 👇 attach user id safely
    req.docId=decoded.id;

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authDoctor;

