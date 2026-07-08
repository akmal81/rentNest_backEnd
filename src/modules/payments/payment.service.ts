import { PaymentStatus, RentRequestStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelper/appError";
import { prisma } from "../../lib/prisma"
import httpStatus from 'http-status'
import { initiatePayment, varifyPayment } from "./paymentUtils";
import axios from "axios";

const createPaymentSSlCommerz = async (userId: string, requestId: string) => {

    const rentInfo = await prisma.rentRequest.findFirstOrThrow(
        {
            where: {
                id: requestId
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

    const cusName = rentInfo.tenant.name;
    const cusEmail = rentInfo.tenant.email;
    const rentAmount = rentInfo.property.rentAmount;

    const { GatewayPageURL, transId } = await initiatePayment(rentAmount, cusName, cusEmail)

    if (!GatewayPageURL) {
        throw new AppError(httpStatus.BAD_GATEWAY, "Somethis Went Wrong While Payment")
    }

    const newPayment = await prisma.payment.create({
        data: {
            transactionId: transId,
            rentalRequestId: requestId
        },
        omit: {
            nextRentDate: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return { rentInfo, ...newPayment, GatewayPageURL }
}

// 

const confirmPayment = async (
    tranId: string,
    status: string,
    payload: Record<string, unknown>) => {

    const varifieddata = await varifyPayment(payload);


    if (varifieddata.data.status !== "VALID") {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Sorry your payment is not validate");

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

const getUserPaymentHistory = async(userId:string)=>{
    const paymentHistory = await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        },
        include:{
            tenantRequest:true

        },
        omit:{
            password:true
        }
    })

    return paymentHistory
}


export const paymentServices = {
    createPaymentSSlCommerz,
    confirmPayment,
    getUserPaymentHistory
}