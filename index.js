import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from "cors"
import { connectDB } from './config/db.js';
import serviceRoutes from './routes/ServiceRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import appointmentRoutes from './routes/AppointmentRoutes.js';

// configurar la app
const app = express();
// habilitar variables de entorno
dotenv.config();
// conexion a la base de datos
connectDB();
// habilitar peticiones json
app.use(express.json());

// habilitar cors
const allowedOrigins = [process.env.FRONTEND_URL];

if(process.argv[2] === '--postman'){
  allowedOrigins.push(undefined)
}

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

app.use(cors(corsOptions));

// definir ruta
app.use('/api', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);

// definir puerto
const port = process.env.PORT || 4000
// ararrancar la app
app.listen(port, () => {
  console.log(colors.blue.bold(`El servidor esta corriendo en el puerto ${port}`))
})