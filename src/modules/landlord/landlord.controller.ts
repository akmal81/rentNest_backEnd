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

const getAllLandlordsRentalRequests = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const landlordId = req.user?.id;
        const rentalRequests = await landLordServices.getAllLandlordsRentalRequestsFromDb(
            landlordId as string
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Properties Rental Requests Retrive Successfull",
            data: rentalRequests
        })
    }
);

const updatedPropertyAvailabilityStatus = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const landlordId = req.user?.id;
        const propertyId = req.params.id;
        const {availablility} = req.body
        console.log(req.body);
        const updateResult = await landLordServices.updatedPropertyAvailabilityStatus(
            propertyId as string,
            landlordId as string,
            availablility
            );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Availability Updated Successfully",
            data: updateResult
        })
    }
)



const updateRentalRequestStatus = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const rentalRequestId = req.params.id;
        const {status} = req.body
        const rentalRequestStatus = await landLordServices.updateRentalRequestStatusIntoDb(
            rentalRequestId as string, status
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental Request Status Updated",
            data: rentalRequestStatus
        })
    }
);

export const landlordController = {
    createdProperty,
    updatedProperty,
    removeProperty,
    getAllLandlordsRentalRequests,
    updatedPropertyAvailabilityStatus,
    updateRentalRequestStatus
}