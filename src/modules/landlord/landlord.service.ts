
import { RentRequestStatus } from "../../../generated/prisma/enums"
import AppError from "../../errorHelper/appError"
import { prisma } from "../../lib/prisma"
import { ICreateNewProperty, IUpdateProperty } from "./landlord.interface"
import httpStatus from 'http-status'

const createPropertyIntoDb = async (landlordId: string, payload: ICreateNewProperty) => {

    const createdProperty = await prisma.property.create({
        data: {
            ...payload,
            landlordId: landlordId,
        }
    })

    return createdProperty
}

const updatePropertyIntoDb = async (propertyId: string, landlordId: string, payload: IUpdateProperty) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId
        }
    })

    if (!property) {
        throw new AppError(httpStatus.CONFLICT, "Property not Found")
    }
    if (property.landlordId !== landlordId) {
        throw new AppError(httpStatus.CONFLICT, "Only owner can edit own property!!")
    }

    const updatedProperty = await prisma.property.update({
        where: {
            id: propertyId
        },
        data: payload
    })
    return updatedProperty
}


const revomePropertyFromDb = async (propertyId: string, landlordId: string) => {
    const property = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId
        }
    })

    if (!property) {
        throw new AppError(httpStatus.CONFLICT, "Property not Found")
    }
    if (property.landlordId !== landlordId) {
        throw new AppError(httpStatus.CONFLICT, "Only owner can edit own property!!")
    }

    const removedData = prisma.property.delete({
        where: {
            id: propertyId,
            landlordId: landlordId
        }
    })
    return removedData


}

const getAllLandlordsRentalRequestsFromDb = async (landlordId: string) => {
    const rentalRequests = await prisma.property.findMany({
        where: {
            landlordId,
            rentRequest: {
                some: {}
            }
        },
        include: {
            rentRequest: {
                include: {
                    tenant: {
                        select: {
                            name: true,
                            email: true,
                            profile: {
                                select: {
                                    phoneNumber: true
                                }
                            }

                        }
                    }

                },

            }
        }
    })



    return rentalRequests

}

const updateRentalRequestStatusIntoDb = async (
    rentalRequestId: string, 
    status: RentRequestStatus) => {

        // c

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            // if already approved

            // const checkRent
            const updateRequestStatus = await tx.rentRequest.update({
                where: {
                    id: rentalRequestId
                },
                data: {
                    status:status
                },
                include:{
                    property:{
                        select: {
                            availablity:true
                        }
                    }
                }
            })


            if (updateRequestStatus.status === "APPROVED") {

                await tx.property.update({
                    where: {
                        id: updateRequestStatus.propertyId
                    },
                    data: {
                        availablity: "BOOKED"
                    }
                })
            }

            return updateRequestStatus
        }
    )
    return transactionResult
}

export const landLordServices = {
    createPropertyIntoDb,
    updatePropertyIntoDb,
    revomePropertyFromDb,
    getAllLandlordsRentalRequestsFromDb,
    updateRentalRequestStatusIntoDb
}


