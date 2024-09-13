import { NextFunction, Request, Response } from "express";
import User from "../Models/userModel";
import dotenv from "dotenv";
import userSignupValidation from "../utils/validation/userSignUpValidation";
import { hashPassword } from "../utils/bcrypt/hashPassword";
import { generateAccessToken } from "../utils/jwt/generateAccessToken";
import { generateRefreshToken } from "../utils/jwt/generateRefreshToken";
import userLoginValidation from "../utils/validation/userLoginValidation";
import { comparePassword } from "../utils/bcrypt/comparePassword";

dotenv.config();

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    
    const { value, error } = userSignupValidation.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      res.status(409).json({ success: false, message: "User Already Exists" });
      return;
    }

    value.password = await hashPassword(value.password);
    const newUser = await User.create(value);

    const accessToken = generateAccessToken({
      _id: String(newUser._id),
      email: newUser.email,
    });

    const refreshToken = generateRefreshToken({
      _id: String(newUser._id),
      email: newUser.email,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
          secure: true,
          sameSite:"none",
      maxAge: 7200000, 
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite:"none",
      
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userWithoutPassword = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      dateOfBirth: newUser.dateOfBirth,
      preferences: newUser.preferences,
      isLogged: true,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

    const { identifier, phone, password } = req.body;

    if (!identifier && !( phone)) {
      res
        .status(400)
        .json({
          success: false,
          message: "Identifier or country and phone are required",
        });
      return;
    }

    let loginUser;
    if (identifier) {
      loginUser = await User.findOne({ email: identifier });
      console.log(loginUser);
    } else if ( phone) {
      loginUser = await User.findOne({  phone });
    }

    if (!loginUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const match = await comparePassword(password, loginUser.password);
    if (!match) {
      res
        .status(401)
        .json({ success: false, message: "Password is incorrect" });
      return;
    }

    const accessToken = generateAccessToken({
      _id: String(loginUser._id),
      email: loginUser.email,
    });

    const refreshToken = generateRefreshToken({
      _id: String(loginUser._id),
      email: loginUser.email,
    });
console.log("access",accessToken);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
          secure: true,
          sameSite:"none",
      

      maxAge: 7200000,// 15 minutes
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
          secure: true,
          sameSite:"none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userWithoutPassword = {
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
      email: loginUser.email,
      phone: loginUser.phone,
      dateOfBirth: loginUser.dateOfBirth,
      preferences: loginUser.preferences,
      isLogged: true,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    console.log("cookie cleared");

    res.status(201).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

    const { oldPassword, newPassword ,userId} = req.body.data;
    console.log(userId);
    

    const existingUser=await User.findById({_id:userId})

    if(!existingUser){
      res.status(404).json({ success: false, message: "User not found" });
      return;

    }
    const match = await comparePassword(oldPassword, existingUser.password);
    if (!match) {
      res
        .status(401)
        .json({ success: false, message: "Old Password is incorrect" });
      return;
    }

    existingUser.password=await hashPassword(newPassword)
    await existingUser.save();

    const userWithoutPassword = {
      firstName: existingUser .firstName,
      lastName:  existingUser.lastName,
      email:     existingUser.email,
      phone:     existingUser.phone,
    dateOfBirth: existingUser.dateOfBirth,
  preferences:   existingUser.preferences,
      isLogged: true,
    };


   

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      user:userWithoutPassword
     
    });
  } catch (error) {
    next(error);
  }
};


export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);

    const { userId, ...updateData } = req.body.data;
    console.log(userId);
    

    const existingUser=await User.findById({_id:userId})

    if(!existingUser){
      res.status(404).json({ success: false, message: "User not found" });
      return;

    }
   
    Object.keys(updateData).forEach(key => {
      if (key !== '_id') {
        (existingUser as any)[key] = updateData[key];
      }
    });

   
    await existingUser.save();

    const userWithoutPassword = {
      firstName: existingUser .firstName,
      lastName:  existingUser.lastName,
      email:     existingUser.email,
      phone:     existingUser.phone,
    dateOfBirth: existingUser.dateOfBirth,
  preferences:   existingUser.preferences,
      isLogged: true,
    };


   

    res.status(200).json({
      success: true,
      message: "Profile Updated successfully",
      user:userWithoutPassword
     
    });
  } catch (error) {
    next(error);
  }
};
