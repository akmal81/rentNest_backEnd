import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { landLordServices } from "./landlord.service";


const createdProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const landlordId = req.user?.id
        const property = await landLordServices.createPropertyIntoDb(landlordId as string, req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Property Created Successfully",
            data: { property }
        })
    }
)

const updatedProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const landlordId = req.user?.id;
        const propertyId = req.params.id;
        const updateResult = await landLordServices.updatePropertyIntoDb(
            propertyId as string, 
            landlordId as string, 
            req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Property Updated Successfully",
            data: updateResult
        })
    }
)
const removeProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const landlordId = req.user?.id;
        const propertyId = req.params.id;
        const removedResult = await landLordServices.revomePropertyFromDb(
            propertyId as string, 
            landlordId as string, 
            );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Property Removed Successfully",
            data: removedResult
        })
    }
)


export const landlordController = {
    createdProperty,
    updatedProperty,
    removeProperty
}