import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import dotenv from 'dotenv';
dotenv.config();

const salt = bcrypt.genSaltSync(10);

export const signup = async (req, res, next) => {
  try{
    const {email,username,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
     const checkUser = await User.findOne({email});
     if(checkUser) return res.status(400).json({message: "User already exists"});
     const user = await User.create({email,username, password: hashedPassword});
        res.status(201).json({user});
  } catch (error) {
   next (error); 
}
}

export const signin = async (req, res, next) => {
    try{
         const {username,password} = req.body;

         const user =await User.findOne({username});

         if(!user) return next(createError(400, "User does not exist"));

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) return next(createError(400, "Password is incorrect"));

           const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET);
           console.log(token);
           delete user._doc.password;
           res.cookie("access_token", token); 
           res.cookie("access_token", token.toString(), {
             maxAge:3600000,
               httpOnly: true,
               secure:true,
           }).status(200).json({user:user._doc, token});

        } catch (error) {
        next (error);
        }
}

export const googleAuth = async (req, res, next) => {
   try{
       const user =await User.findOne({email:req.body.email})
       if(user) {
         const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.cookie("access_token", token, {
               httpOnly: true,
               expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
               sameSite: 'strict',
               }).status(200).json(user._doc);
       }
       else{
            const newUser = await User.create({email:req.body.email, username: req.body.username, img: req.body.img, fromGoogle:true});
            const savedUser = await newUser.save();
            const token =  jwt.sign({id: savedUser._id}, process.env.JWT_SECRET)
            res.cookie("access_token", token, {
               httpOnly: true,
               }).status(200).json(savedUser._doc);
       }
   } catch (error) {
    next (error);
   }
}