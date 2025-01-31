import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function authMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const bearer = req.headers.authorization;
     
      const token = bearer.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_JWT);
      const { id } = user;
      const userDB = await User.findById(id, "-confirmed -password -token -__v -updatedAt -createdAt ");
      req.user = userDB;
    } catch (error) {
      return res.status(403).json({ msg: "Token no valido" });
    }
  } else {
    return res.status(403).json({ msg: "No tenemos un token valido o ingresado" });
  }

  next();
}

export default authMiddleware;
