import { PaymentStatus, RentRequestStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelper/appError";
import { prisma } from "../../lib/prisma"
import httpStatus from 'http-status'
import { initiatePayment, varifyPayment } from "./paymentUtils";


const createPaymentSSlCommerz = async (userId: string, requestId: string) => {

    const rentInfo = await prisma.rentRequest.findFirstOrThrow(
        {
            where: {
                id: requestId,
                tenantId:userId
            },
            include: {
                tenant: {
                    omit: {
                        password: true
                    }
                },
                property: true,

            }
        }
    )

    

    if (rentInfo.status === RentRequestStatus.REJECTED) {
        throw new AppError(httpStatus.CONFLICT, "Your rent request has been rejected by property owner ")
    }

    if (rentInfo.status !== RentRequestStatus.APPROVED) {
        throw new AppError(httpStatus.CONFLICT, "Your Rent Request is not APPROVED Yet!")
    }

    if(rentInfo.tenantId !== userId){
        throw new AppError(httpStatus.CONFLICT, "Sorry You are not a valid user!!")
    }

    const cusName = rentInfo.tenant.name;
    const cusEmail = rentInfo.tenant.email;
    const rentAmount = rentInfo.property.rentAmount;

    const { GatewayPageURL, transId } = await initiatePayment(rentAmount, cusName, cusEmail)

    if (!GatewayPageURL) {
        throw new AppError(httpStatus.BAD_GATEWAY, "Something Went Wrong While Payment")
    }

    const newPayment = await prisma.payment.create({
        data: {
            transactionId: transId,
            rentalRequestId: requestId,
            userId,
            rentAmount
        },
        omit: {
            nextRentDate: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return { ...newPayment, GatewayPageURL }

}

// 

const confirmPayment = async (
    tranId: string,
    status: string,
    payload: Record<string, unknown>) => {

    const varifieddata = await varifyPayment(payload);


    if (varifieddata.data.status !== "VALID") {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Sorry your payment is not validated");

    }


    const updatedPaymentData = await prisma.payment.update({
        where: {
            transactionId: tranId
        },
        data: {
            status: PaymentStatus.ACTIVE,
            nextRentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
    })

    return updatedPaymentData
}



// 

const getUserPaymentHistory = async (userId: string) => {
    const paymentHistory = await prisma.payment.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return paymentHistory
}


const getPaymentDetailsById = async (paymentId: string) => {
    const payment = await prisma.payment.findUniqueOrThrow({
        where: {
            id: paymentId
        }
    })
    return payment
}

export const paymentServices = {
    createPaymentSSlCommerz,
    confirmPayment,
    getUserPaymentHistory,
    getPaymentDetailsById
}