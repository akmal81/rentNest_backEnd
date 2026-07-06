import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rentals.controller";

const router =Router();


router.post(
    '/',
    auth(Role.TENANT),
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