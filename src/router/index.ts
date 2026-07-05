import { Router } from "express";

const router = Router();

router.use("/auth")
router.use("/properties")
router.use("/categories")
router.use("/landlord")
router.use("/rentals")
router.use("/payments")
router.use("/reviews")
router.use("/admin")


export const routerIndex = router