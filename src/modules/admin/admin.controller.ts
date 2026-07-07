
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { adminServices } from "./admin.service";



const getAllUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await adminServices.getAllUserFromDb()
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "",
            data: users
        })
    }
);


const updateUserStatus = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        const {status} = req.body;

        const updatedStatus = await adminServices.updateUserStatusIntoDb(
            userId as string,
            status
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "",
            data: updatedStatus
        })
    }
);


const getAllProperties = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const properties = await adminServices.getAllPropertiesFromDb()
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "",
            data: properties
        })
    }
);


const getAllRentalRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
const rentalRequest = await adminServices.getAllRentalRequesFromDb()
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "",
            data: rentalRequest
        })
    }
);

export const adminController = {
    getAllUser,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequest
}