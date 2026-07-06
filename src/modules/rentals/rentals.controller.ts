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

const getUserRentalRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const tenantId = req.user?.id;
        

       
        const rentalRequests = await rentalRequestServices.getUserRentalRequestFromDb(
            tenantId as string
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental Requests Retrive Successfully",
            data: rentalRequests
        })
    }
);


const getRentalRequestDetailsById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const requestId = req.params.id;
        

       
        const rentalRequest = await rentalRequestServices.getRentalRequestDetailsByIdFromDb(
            requestId as string
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental Request Retrive Successfully",
            data: rentalRequest
        })
    }
);



export const rentalRequestController = {
    submitRentalRequest,
    getUserRentalRequest,
    getRentalRequestDetailsById
}