import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { landlordController } from "./landlord.controller";

const router =Router();

router.post(
    "/properties",
    auth(Role.LANDLORD),
    landlordController.createdProperty
)
router.put(
    "/properties/:id",
    auth(Role.LANDLORD),
    landlordController.updatedProperty
)
router.delete(
    "/properties/:id",
    auth(Role.LANDLORD),
    landlordController.removeProperty
)
router.get(
    "/requests",
    auth(Role.LANDLORD),
    landlordController.getAllLandlordsRentalRequests
)

router.patch(
    "/properties/availability/:id",
    auth(Role.LANDLORD),
    landlordController.updatedPropertyAvailabilityStatus
)

router.patch(
    "/requests/:id",
    auth(Role.LANDLORD),
    landlordController.updateRentalRequestStatus
)

export const landlordRotes = router;