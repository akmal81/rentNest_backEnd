import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { reviewServices } from "./reviews.service";

const createReviews = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const payload = req.body;

        const review  = await reviewServices.createReviews(userId as string, payload)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "",
            data:review
        })
    }
);

export const reviewControllers = {
    createReviews
}