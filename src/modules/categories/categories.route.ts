import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryControllers } from "./categories.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createCategoryPayloadSchema } from "./categories.validation";

const router =Router();

router.post(
    "/",
    auth(Role.ADMIN),
    validateRequest(createCategoryPayloadSchema),
    categoryControllers.createCategory
)

router.get(
    "/",
    categoryControllers.getAllcategories

)

export const categoryRotes = router;