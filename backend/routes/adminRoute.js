import express from 'express';
import { addDoctor, loginAdmin , allDoctors} from '../controllers/adminController.js';

import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import {changeAvailability} from '../controllers/doctorController.js';

const adminRoute = express.Router();
adminRoute.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRoute.post('/login', loginAdmin);
adminRoute.post('/all-doctors',authAdmin,allDoctors);
adminRoute.post('/change-availability',authAdmin,changeAvailability);
export default adminRoute;