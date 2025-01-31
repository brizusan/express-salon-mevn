import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.cyan.bold.bgWhite(`MongoDB Conectado: ${conn.connection.host} : ${conn.connection.port}`));
  } catch (error) {
    console.log(error.message);
    // salida de error
    process.exit(1);
  }
};
