import { Router } from "express";
import { propertyController } from "./properties.controller";

const router = Router();

router.get(
    "/",
    propertyController.getAllProperty
)
router.get(
    "/:id",
    propertyController.getPropertyById
)


export const propertyRoutes = router;