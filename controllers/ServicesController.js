import Services from "../models/Services.js"
import { validateObjectId } from "../utils/index.js";


// obtener lista de servicios
export const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    console.log(error);
  }
  
};

// obtener servicio por id
export const getServiceById = async(req, res) => {
  const {id} = req.params
  // validar ObjectId
  if(!validateObjectId(id)){
    res.status(400).json({msg: 'id no valido'});
    return
  }
  const service = await Services.findById(id);
  if(!service) return res.status(404).json({msg: 'Servicio no encontrado'});
  res.json(service);
}

// generar nuevos servicios
export const createService = async (req, res) => {
  // validacion simple de campos
  if(Object.values(req.body).includes('')) {
    res.status(400).json({msg: 'Todos los campos son obligatorios'});
    return;
  }
  const newService = req.body;
  try {
    const serviceDB = new Services(newService);
    await serviceDB.save();
    res.status(201).json({msg: 'Servicio creado correctamente'});
  } catch (error) {
    console.log(error)
  }
};

export const updateService = async (req, res) => {
  const {id} = req.params
  const {name, price} = req.body
  // validar ObjectId
  if(!validateObjectId(id)){
    res.status(400).json({msg: 'id no valido'});
    return
  }
  const service = await Services.findById(id);
  if(!service) return res.status(404).json({msg: 'Servicio no encontrado'});
  // 
  service.name = name || service.name;
  service.price = price || service.price;

  try {
    await service.save();
    res.status(200).json({msg: 'Servicio actualizado correctamente'});
  } catch (error) {
    console.log(error)
  }
}

// eliminar servicio
export const deleteService = async (req, res) => {
  const {id} = req.params
  if(!validateObjectId(id)){
    res.status(400).json({msg: 'id no valido'});
    return
  }

  const service = await Services.findById(id);
  if(!service) return res.status(404).json({msg: 'Servicio no encontrado'});
  try {
    await service.deleteOne();
    res.status(200).json({msg: 'Servicio eliminado correctamente'});
    
  } catch (error) {
    console.log(error)
  }
}
