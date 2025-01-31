import User from "../models/User.js";
import {
  sendEmailVerification,
  sendForgotAccount,
} from "../email/authEmailService.js";
import {
  hashPassword,
  comparePassword,
  generateJWT,
  generateToken,
} from "../utils/index.js";

export const getUser = async (req, res) => {
  const user = req.user;
  res.json(user);
};

export const getAdmin = async (req, res) => {
  const user = req.user;
  if(!user.admin) return res.status(403).json({msg:'Acceso denegado'})
  res.json(user);
};

export const registerUser = async (req, res) => {
  // validar campos vacios
  if (Object.values(req.body).includes("")) {
    res.status(400).json({ msg: "Todos los campos son obligatorios" });
    return;
  }
  const { password, email } = req.body;
  // validar registros unicos
  const userExists = await User.findOne({ email });
  if (userExists)
    return res
      .status(400)
      .json({ msg: "Tenemos un usuario registrado con este correo" });

  // validar extension del password
  if (password.length < 8)
    return res
      .status(400)
      .json({ msg: "La contraseña debe tener al menos 8 caracteres" });

  try {
    const user = new User(req.body);
    user.password = await hashPassword(password);
    const resUser = await user.save();
    sendEmailVerification({
      name: resUser.name,
      email: resUser.email,
      token: resUser.token,
    });
    res
      .status(201)
      .json({ msg: "Usuario creado correctamente , revisa tu email" });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.params;
  // validar token
  const user = await User.findOne({ token });
  if (!user) return res.status(400).json({ msg: "Token no valido" });

  try {
    user.confirmed = true;
    user.token = null;
    await user.save();
    res.status(200).json({ msg: "Cuenta verificada correctamente" });
  } catch (error) {
    throw new Error("Error al verificar la cuenta");
  }
};

export const loginUser = async (req, res) => {
  if (Object.values(req.body).includes(""))
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "El usuario no existe" });

  if (!user.confirmed)
    return res.status(400).json({ msg: "Cuenta no verificada" });

  if (await comparePassword(password, user.password)) {
    const tokenJWT = generateJWT({
      id: user._id,
    });
    res.status(200).json({ msg: "Acceso permitido", token: tokenJWT });
  } else {
    return res.status(400).json({ msg: "Contraseña incorrecta" });
  }
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

  try {
    user.token = generateToken();
    const restUser = await user.save();
    sendForgotAccount({
      name: restUser.name,
      email: restUser.email,
      token: restUser.token,
    });

    res
      .status(200)
      .json({ msg: "Hemos enviado un correo con las instrucciones" });
  } catch (error) {
    console.log(error)
  }
};

export const verifyForgotToken = async (req , res)=>{
  const {token} = req.params
  const user = await User.findOne({token})
  if(!user)return res.status(404).json({msg:'Token enviado no valido'})
  res.status(200).json({msg:'token validado'})
}

export const updatePassword = async(req , res)=>{
  const {password} = req.body
  const { token } = req.params
  try {
    const user = await User.findOne({token})
    user.password = await hashPassword(password);
    user.token = null
    await user.save()
    res.status(200).json({msg:'contraseña actualizada , inicia sesión'})
  } catch (error) {
    console.log(error)
    res.status(400).json({msg:'Error al reestablecer password'})
  }
  
}
