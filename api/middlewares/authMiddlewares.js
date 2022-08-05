import createError from "../controllers/errorControllers.js";
import jwt from "jsonwebtoken";

// check user authenticated or not
export const authMiddleware = (req,res,next) => {
    try {
        
        const token = req.cookies.access_token;

        // check token
        if (!token) {
            return next(createError(401, 'You Are Not Authenticated'))
            
        }
        
        // if logged in
        const loginUser = jwt.verify(token, process.env.JWT_SECRET);

        if (!loginUser) {
            return next(createError(401, 'Invalid Token'));
        }
        
        if (loginUser) {
            req.user = loginUser;
            next()
        }

    } catch (error) {
        next(error)
    }
}