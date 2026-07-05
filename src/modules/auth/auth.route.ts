import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { authController } from "./auth.controller";

const router =Router();

router.post(
    "/register", 
    authController.registerUser
)

router.post(
    "/login",
    authController.loginUser
)

// router.get(
//     "/me",
//     auth(Role.TENANT, Role.LANDLORD, Role.ADMIN),

// )
 

export const authRotes = router;