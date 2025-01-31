import mongoose from "mongoose"
import { generateToken } from "../utils/index.js"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String,
    default: () => generateToken()
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  admin:{
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User;