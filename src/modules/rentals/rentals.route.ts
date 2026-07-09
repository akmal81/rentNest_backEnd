import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rentals.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createRentalsRequestSchema } from "./rentals.validation";

const router =Router();


router.post(
    '/',
    auth(Role.TENANT),
    validateRequest(createRentalsRequestSchema),
    rentalRequestController.submitRentalRequest
)
router.get(
    '/',
    auth(Role.TENANT),
    rentalRequestController.getUserRentalRequest
)
router.get(
    '/:id',
    auth(Role.TENANT),
    rentalRequestController.getRentalRequestDetailsById
)

export const rentalRotes = router;