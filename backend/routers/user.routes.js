import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getCurrentUser,
  login,
  logoutAdmin,
  logoutPatient,
  registerUser,
} from "../controllers/user.controller.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", registerUser);
router.get("/patient/me", isPatientAuthenticated, getCurrentUser);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

router.post("/login", login);

router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getCurrentUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;