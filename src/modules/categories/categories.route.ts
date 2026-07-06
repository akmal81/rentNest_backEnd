import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryControllers } from "./categories.controller";

const router =Router();

router.post(
    "/",
    auth(Role.ADMIN),
    categoryControllers.createCategory
)

router.get(
    "/",
    categoryControllers.getAllcategories

)

export const categoryRotes = router;