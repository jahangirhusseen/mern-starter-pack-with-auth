import bcrypt from "bcryptjs";
import User from "../models/User.js";
import createError from "./errorControllers.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

/**
 * @access Public
 * @route /api/user
 * @method GET
 */
 export const getAllUser = async (req,res,next) => {
    try {
        const users = await User.find();
        if ( !users ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (users) {
          return res.status(200).json(users)
         }

    } catch (error) {

        next(createError(404, 'data not found'));
        
    }
    
}

/**
 * @access Public
 * @route /api/user/:id
 * @method GET
 */

 export const getSingleUser = async (req,res,next) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);

        if ( !user ) {
          return  next(createError(404, 'data not found'));
            
        }
       if (user) {
        return res.status(200).json(user)
       }
    } catch (error) {
        next(error)
    }
}

/**
 * @access Public
 * @route /api/student
 * @method POST
 */

 export const createUser = async (req,res,next) => {
    
    // Make Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await  bcrypt.hash(req.body.password , salt)

    try {
        const user = await User.create({...req.body, password : hash_pass})
        if ( !user ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (user) {
          return res.status(200).json(user)
         }
    } catch (error) {
        next(error)
        
    }

}


/**
 * @access Public
 * @route /api/user/:id
 * @method PUT/PATCH
 */

 export const updateUser = async (req,res,next) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body,{ new : true });
        if ( !user ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (user) {
          return res.status(200).json(user)
         }
    } catch (error) {
        next(error);
    }
}


/**
 * @access Public
 * @route /api/user/:id
 * @method DELETE
 */

 export const deleteUser = async (req,res,next) => {
    const {id} = req.params;
    try {
        const user = await user.findByIdAndDelete(id);
        if ( !user ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (user) {
          return res.status(200).json(user)
         }
    } catch (error) {
        next(error)
    }
}


/**
 * @access Public
 * @route /api/user/login
 * @method POST
 */

 export const userLogin = async (req,res,next) => {
    

   try {
    
    // find user data
    const loginUser = await User.findOne({email : req.body.email})

    // Check User Exists or not
    if (!loginUser) {

        return next(createError(404,'Email Not Found'));
    }

    // Check Password Handle
    const passwordCheck = await bcrypt.compare(req.body.password, loginUser.password);
    if (!passwordCheck) {

        return next(createError(404,'Wrong Password'));
    }

    // create jsonwebtoken
    const token = jwt.sign({id : loginUser._id, isAdmin : loginUser.isAdmin}, process.env.JWT_SECRET)

    // login user info
    const {_id,isAdmin, password, ...loginInfo} = loginUser._doc

    res.cookie("access_token",token).status(200).json({
        token,
        user:loginInfo
        
    })

   } catch (error) {
    
   }

}

/**
 * @access Public
 * @route /api/user/register
 * @method POST
 */

 export const userRegister = async (req,res,next) => {
    
    // Make Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await  bcrypt.hash(req.body.password , salt)

    try {
        const user = await User.create({...req.body, password : hash_pass})
        if ( !user ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (user) {
          return res.status(200).json(user)
         }
    } catch (error) {
        next(error)
        
    }

}