import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import createError from "./errorControllers.js";

/**
 * @access Public
 * @route /api/student
 * @method GET
 */
 export const getAllStudent = async (req,res,next) => {
    try {
        const students = await Student.find();
        if ( !students ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (students) {
          return res.status(200).json(students)
         }

    } catch (error) {

        next(createError(404, 'data not found'));
        
    }
    
}

/**
 * @access Public
 * @route /api/student/:id
 * @method GET
 */

 export const getSingleStudent = async (req,res,next) => {
    const {id} = req.params;
    try {
        const student = await Student.findById(id);

        if ( !student ) {
          return  next(createError(404, 'data not found'));
            
        }
       if (student) {
        return res.status(200).json(student)
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

 export const createStudent = async (req,res,next) => {
    
    // Make Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await  bcrypt.hash(req.body.password , salt)

    try {
        const student = await Student.create({...req.body, password : hash_pass})
        if ( !student ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (student) {
          return res.status(200).json(student)
         }
    } catch (error) {
        next(error)
        
    }

}


/**
 * @access Public
 * @route /api/student/:id
 * @method PUT/PATCH
 */

 export const updateStudent = async (req,res,next) => {
    const {id} = req.params;
    try {
        const student = await Student.findByIdAndUpdate(id, req.body,{ new : true });
        if ( !student ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (student) {
          return res.status(200).json(student)
         }
    } catch (error) {
        next(error);
    }
}


/**
 * @access Public
 * @route /api/student/:id
 * @method DELETE
 */

 export const deleteStudent = async (req,res,next) => {
    const {id} = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if ( !student ) {
            return  next(createError(404, 'data not found'));
              
          }
         if (student) {
          return res.status(200).json(student)
         }
    } catch (error) {
        next(error)
    }
}
