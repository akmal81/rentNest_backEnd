import { RentRequestStatus } from "../../../generated/prisma/enums"
import AppError from "../../errorHelper/appError"
import { prisma } from "../../lib/prisma"
import httpStatus from 'http-status'
import { ICreateReviewsPayload } from "./reviews.interface"

const createReviews = async (userId: string, payload: ICreateReviewsPayload) => {

    
    const { rentalRequesId, propertyId, content } = payload;
    const rentalRequest = await prisma.rentRequest.findUniqueOrThrow(
        {
            where: {
                id: rentalRequesId,
            },
            include: {
                property: true
            }
        }
    )
console.log(rentalRequest);
    if (!rentalRequest) {

        throw new AppError(httpStatus.CONFLICT, "Rental Request Not Found")
    }

    if(rentalRequest.status !== RentRequestStatus.COMPELETED){
        throw new AppError(httpStatus.CONFLICT, "You can post a review once the rental agreement is completed")
    }

    const review = await prisma.review.create({
        data: {
            userId: userId,
            content: content,
            propertyId: propertyId
        }
    })

    return review
}


export const reviewServices = {
    createReviews
}