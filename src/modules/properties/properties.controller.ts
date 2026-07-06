import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { propertyServices } from "./properties.service";
import { IGetPropertyQuery } from "./properties.interface";

const getAllProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;
        const propertiesData = await propertyServices.getAllPropertyFromDb(query);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Property Retrive Successfully",
            data: propertiesData
        })
    }
);


const getPropertyById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.id
        const propertyDetails = await propertyServices.getPropertyByIdFromDb(
            propertyId as string
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "",
            data: {propertyDetails}
        })
    }
);

export const propertyController = {
    getAllProperty,
    getPropertyById
}