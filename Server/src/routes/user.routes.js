import { Router } from "express";
import { loginUser, registerUser, validateToken } from "../controllers/user.controller.js";
import { auth } from "../auth/AuthToken.js";

const router = Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/validate-token").post(auth,validateToken)

export default router