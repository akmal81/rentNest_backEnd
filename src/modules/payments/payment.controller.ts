import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'
import { paymentServices } from "./payment.service";

const createPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { requestId } = req.body;
        const userId = req.user?.id;
        const result = await paymentServices.createPaymentSSlCommerz(
            userId as string,
            requestId as string
        )
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment Initiated successfully!! Please Confirm Your Payment",
            data: result
        })
    }
);

const confirmPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { tranId, status} = req.query;

        const payload = req.body;

        const result = await paymentServices.confirmPayment(

            tranId as string,
            status as string,
            payload)
        console.log(result);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment Confirmatiom successfull!!",
            data: result
        })
    }
)


export const paymentsController = {
    createPayment,
    confirmPayment
}