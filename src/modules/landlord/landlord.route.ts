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

export const landlordRotes = router;