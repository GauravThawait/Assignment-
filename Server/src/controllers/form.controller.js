import { Form } from "../models/form.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const formCreate = asyncHandler( async (req, res)=> {
    console.log("form creation api hitted :" , req.body)
    const {name, email, gender, contact, qualification, interest, about } = req.body;

    if(
        [email, name, contact, gender, qualification ].some((field) => 
            field === undefined || field === null || field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const createForm = await Form.create({
        name : name,
        email : email,
        phoneNumber : contact,
        gender : gender,
        qualification: qualification,
        interest : interest,
        about: about
    })
    if(!createForm){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    res.status(200).json( new ApiResponse(200, createForm, "Application submitted successfully"))
})

export {formCreate}