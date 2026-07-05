import { Router } from "express";
import { authRotes } from "../modules/auth/auth.route";
import { adminRotes } from "../modules/admin/admin.route";
import { categoryRotes } from "../modules/categories/categories.route";
import { landlordRotes } from "../modules/landlord/landlord.route";
import { rentalRotes } from "../modules/rentals/rentals.route";
import { paymentRotes } from "../modules/payments/payment.route";
import { reviewRotes } from "../modules/reviews/reviews.route";
import { propertyRoutes } from "../modules/properties/properties.route";

const router = Router();

router.use("/auth", authRotes)
router.use("/properties", propertyRoutes)
router.use("/categories", categoryRotes)
router.use("/landlord", landlordRotes)
router.use("/rentals", rentalRotes)
router.use("/payments", paymentRotes)
router.use("/reviews", reviewRotes)
router.use("/admin", adminRotes)


export const routerIndex = router