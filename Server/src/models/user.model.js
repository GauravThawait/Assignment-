import mongoose from "mongoose"
import { TOKEN_EXPIRY, TOKEN_SECRET_KEY } from "../constant.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps: true})

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken =  function (){
   return jwt.sign(
            {
                _id : this._id,
            },
            TOKEN_SECRET_KEY,
            {
                expiresIn : TOKEN_EXPIRY
            }
    )
}

export const User = mongoose.model("User", userSchema)