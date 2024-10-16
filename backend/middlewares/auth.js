import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";


const isAdminAuthenticated = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.adminToken; 

    if (!token) {
      return next( new ApiError(400,"Admin Unauthorized request"));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodeToken?.id).select("-password");

    if(!user){
      throw new ApiError(401, "Invalid Access Token")
    }
    if(user.role !== "Admin"){
        throw new ApiError(403, `${user.role} not authorized for this resource!`);
    }
    req.user = user;
    next();
});


const isPatientAuthenticated = asyncHandler( async (req, res, next) => {

    const token = req.cookies?.patientToken;

    if (!token) {
      return next(new ApiError(400,"Unautharized Patient request"));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodeToken?.id).select("-password"); 

    if(!user){
        throw new ApiError(401, "Invalid Access Token")
    }
    if(user.role !== "Patient"){
        throw new ApiError(403, `${user.role} not authorized for this resource!`);
    }
    req.user = user;
    next();
  }
);

const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(400,`${req.user.role} not allowed to access this resource!`)
      );
    }
    next();
  };
};

export {
  isAdminAuthenticated,
  isPatientAuthenticated,
  isAuthorized,
}
