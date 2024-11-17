import { auth } from "../auth/AuthToken.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const tokenGeneration = async(userId) =>
    {
        try {
            const user = await User.findById(userId)
    
            if(!user){
                throw new ApiError(404, "User not found");
            }
    
            const token = await user.generateToken(userId)
            return token
    
        } catch (error) {
            console.error("Error in tokenGeneration:", error);
            throw new ApiError(500, "Token generation failed")
        }
    }

const validateToken = asyncHandler(async(req,res) => {

    console.log("validate token funcion called")
    
    if(!req.user){
        throw new ApiError(404, "Invalid token or user")
    }

    return res.status(200).json({
        success: true,
        message: "Token is valid",
    });
})

const registerUser = asyncHandler( async(req,res) => {
    const {email, password} = req.body;

    if(
        [email, password].some((field) => 
            field === undefined || field === null || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(409, "User with email already exists")
    }


    const user = await User.create({
        email: email,
        password: password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res)=> {
    const {email, password} = req.body
    console.log("login api hitted")
    if(!email || !password){
        throw new ApiError(400,"username or password is required")
    }

    const createUser = await User.findOne({email})
    
    if((!createUser)){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await createUser.isPasswordCorrect(password);


    if(!isPasswordValid)
    {
        throw new ApiError(401,"Invalid user credentials")
    }

    const token = await tokenGeneration(createUser._id)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    }

    let user = createUser;
    user["password"] = null;
 
    return res.status(200)
    .cookie("token", token, options)
    .json(
        new ApiResponse(
            200,
            {
                user, 
                token
            },
            "User Logged Successfully"
        )
    )

})


export {registerUser, loginUser, validateToken}