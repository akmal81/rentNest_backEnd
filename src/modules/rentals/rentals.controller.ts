import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { rentalRequestServices } from "./rentals.service";

const submitRentalRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tenantId = req.user?.id;
        const { propertyId } = req.body;

        // console.log("from controller", tenantId);
        const rentalRequest = await rentalRequestServices.submitRentalRequestIntoDb(
            tenantId as string,
            propertyId as string
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Request Send Successfully",
            data: rentalRequest
        })
    }
);

export const rentalRequestController = {
    submitRentalRequest
}