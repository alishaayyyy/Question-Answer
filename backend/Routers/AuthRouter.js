import { Router } from "express";
import {signup,login,ForgotPassword,ResetPassword}  from "../Controllers/AuthControllers.js";  // named import
import {loginValidation, signupValidation} from "../MiddleWares/AuthValidation.js";

const router = Router();


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post("/forgot-password",ForgotPassword)
router.post('/reset-password/:token', ResetPassword);

export default router;