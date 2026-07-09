import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewControllers } from "./reviews.controller";

const router =Router();

router.post(
    "/",
    auth(Role.TENANT),
    reviewControllers.createReviews

)

export const reviewRotes = router;