import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewControllers } from "./reviews.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createReviewsPayloadSchema } from "./reviews.validateion";

const router =Router();

router.post(
    "/",
    auth(Role.TENANT),
    validateRequest(createReviewsPayloadSchema),
    reviewControllers.createReviews

)

export const reviewRotes = router;