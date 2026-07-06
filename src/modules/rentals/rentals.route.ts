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

export const rentalRotes = router;