import { TOKEN_SECRET_KEY } from "../constant.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const auth = asyncHandler( async(req,res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        throw new ApiError(401, "Token is missing")
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
        req.user = decoded;

        next(); 
    } catch (err) {

        throw new ApiError(403, "Token is invalid or expired");
    }
        
    });

export {auth}