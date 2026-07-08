import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { paymentsController } from "./payment.controller";

const router = Router();

router.post(
    "/create",
    auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
    paymentsController.createPayment

)
router.post(
    "/confirm",
    paymentsController.confirmPayment

)

router.get(
    "/",
    auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
    paymentsController.getUserPaymentHistory

)
router.get(
    "/:id",
    auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
    paymentsController.getUserPaymentDetails

)

export const paymentRotes = router;