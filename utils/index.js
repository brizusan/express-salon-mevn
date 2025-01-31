import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { format, formatISO, parse  } from "date-fns";
import es from "date-fns/locale/es";

export const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const generateToken = () => {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export const generateJWT = ({ id }) => {
  const token = jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: "7d" });
  return token;
};

export const convertToIso = (date) => {
  const newDate = parse(date, "dd/MM/yyyy", new Date());
  return formatISO(newDate);
};

export const formatDate=(date)=>{
  return format(date, "PPPP", { locale: es });
}

