import dotenv from "dotenv";
import colors from "colors";
import Services from "../models/Services.js";
import { connectDB } from "../config/db.js";
import {services} from "./services.js";

dotenv.config();
await connectDB();

async function seedData() {

  try {
    await Services.insertMany(services).then(() => {
      console.log(colors.blue.bold('Data imported'));
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

}

async function clearData() {
  await Services.deleteMany({}).then(() => console.log(colors.red.bold("Data deleted")));
}


if(process.argv[2] === '--import'){
  seedData();
}else{
  clearData();
}


export { seedData, clearData };