import express from 'express';
import { addDoctor, loginAdmin , allDoctors} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const adminRoute = express.Router();
adminRoute.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRoute.post('/login', loginAdmin);
adminRoute.get('/all-doctors',authAdmin,allDoctors);
export default adminRoute;