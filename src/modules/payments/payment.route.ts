import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { paymentsController } from "./payment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { submitPaymentSchema } from "./payments.validation";

const router = Router();

router.post(
    "/create",
    auth(Role.TENANT),
    validateRequest(submitPaymentSchema),
    paymentsController.createPayment

)
router.post(
    "/confirm",
    paymentsController.confirmPayment

)

router.get(
    "/",
    auth(Role.TENANT),
    paymentsController.getUserPaymentHistory

)
router.get(
    "/:id",
    auth(Role.TENANT),
    paymentsController.getUserPaymentDetails

)

export const paymentRotes = router;