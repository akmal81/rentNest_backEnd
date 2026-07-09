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
            message: "Payment Initiated successfully!!",
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
        
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment Confirmatiom successfull!!",
            data: result
        })
    }
)


const getUserPaymentHistory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id
        const paymentHistory = await paymentServices.getUserPaymentHistory(userId as string)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment History Retrive successfull!!",
            data: paymentHistory
        })
    }
);

const getUserPaymentDetails = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const paymentId = req.params.id
        const payment = await paymentServices.getPaymentDetailsById(paymentId as string)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Payment Details Retrive successfull!!",
            data: payment
        })
    }
);

export const paymentsController = {
    createPayment,
    confirmPayment,
    getUserPaymentHistory,
    getUserPaymentDetails
}