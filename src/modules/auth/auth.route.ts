import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserPayloadSchema, userLoginPayloadSchema } from "./auth.validation";

const router = Router();

router.post(
    "/register",
    validateRequest(createUserPayloadSchema),
    authController.registerUser
)

router.post(
    "/login",
     validateRequest(userLoginPayloadSchema),
    authController.loginUser
)

router.get(
    "/me",
    auth(Role.TENANT, Role.LANDLORD, Role.ADMIN),
    
    authController.geMyProfile
)


export const authRotes = router;