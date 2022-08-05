import createError from "../controllers/errorControllers.js";
import jwt from "jsonwebtoken";

// check user authenticated or not
export const adminMiddleware = (req,res,next) => {
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

        // check id
        if (!loginUser.isAdmin) {
            return next(createError(401, 'Only Admin can access this fetures'));
        }
        
        if (loginUser) {
            req.user = loginUser;
            next()
        }

    } catch (error) {
        next(error)
    }
}