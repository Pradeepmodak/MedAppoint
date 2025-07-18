import express from 'express';
import { addDoctor, loginAdmin , allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard} from '../controllers/adminController.js';

import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import {changeAvailability} from '../controllers/doctorController.js';

const adminRoute = express.Router();
adminRoute.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRoute.post('/login', loginAdmin);
adminRoute.post('/all-doctors',authAdmin,allDoctors);
adminRoute.post('/change-availability',authAdmin,changeAvailability);
adminRoute.get('/appointments',authAdmin,appointmentsAdmin);
adminRoute.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRoute.get('/dashboard',authAdmin,adminDashboard);
export default adminRoute;