import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  
  if(
      [firstName, email, dob, gender, password].some((field) => field.trim() === "") ||
      !phone
  ){
      return next(new ApiError(400, "Please Fill full form"));
  }

  const existUser = await User.findOne({email});
  if(existUser){
      throw new ApiError(409, "User with this email already exist");
  }

  const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role: "Patient",
    });
    generateToken(user, "User Registered!", 200, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ApiError(400, "Please fill full form"));
  }
  if (password !== confirmPassword) {
    return next(
      new ApiError(400, "Password and confirm password did't match")
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiError(400, "Invalid Email or Password!"));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid user credentials");
  }

  if(role !== user.role){
    throw new ApiError(401, "User Not Found With This Role")
  }
  generateToken(user, "Login Successfully!", 201, res);
});

const addNewAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  
  if(
      [firstName, email, dob, gender, password].some((field) => field.trim() === "") ||
      !phone
  ){
      throw new ApiError(400, "Please Fill full form");
  }

  const existUser = await User.findOne({email});
  if(existUser){
      throw new ApiError(409, "Admin with this email already exist");
  } 
  const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role: "Admin",
  });
  return res.status(200)
      .json(new ApiResponse(200, { admin }, "New Admin Registered"))    
})

const addNewDoctor = asyncHandler(async (req, res, next) => {

  const { firstName, lastName, email, phone, dob, gender, password, doctorDepartment } = req.body;

  if([ firstName, email, dob, gender, password, doctorDepartment
  ].some((field) => field.trim() === "") || !phone)
  {
      throw new ApiError(400,"Please fill full form");
  }

  const existUser = await User.findOne({email});

  if(existUser){
      throw new ApiError(409, "Doctor with this email already exist");
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
  });
  return res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});

const getAllDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
    return res.status(200).json({
    success: true,
    doctors,
  });
});

const getCurrentUser = asyncHandler(async(req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
  ))
});

const logoutAdmin = asyncHandler(async (req, res) => {
    return res
    .status(201)
    .cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
    })
    .json({
    success: true,
    message: "Admin Logged Out Successfully.",
  });
});

const logoutPatient = asyncHandler(async (req, res, next) => {
  return res
  .status(201)
  .clearCookie("patientToken", "", {
    httpOnly: true,
    // expires: new Date(Date.now()),
  })
  .json({
    success: true,
    message: "Patient Logged Out Successfully.",
  });
});

export {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getCurrentUser,
  login,
  logoutAdmin,
  logoutPatient,
  registerUser,
}