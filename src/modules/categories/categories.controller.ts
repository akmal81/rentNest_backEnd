import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { categoryServices} from "./categories.service";

const createCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const category = await categoryServices.createCategory(req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Registration Successful",
            data: { category }
        })
    }
);


const getAllcategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const categories = await categoryServices.getAllcategories();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Registration Successful",
            data: { categories }
        })
    }
);

export const categoryControllers = {
    createCategory,
    getAllcategories
}