
import { PropertyAvailablity, RentRequestStatus } from "../../../generated/prisma/enums"
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
        throw new AppError(httpStatus.CONFLICT, "Only owner can update own property!!")
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
        throw new AppError(httpStatus.CONFLICT, "Only owner can remove own property!!")
    }

    const removedData = prisma.property.update({
        where: {
            id: propertyId,
            landlordId: landlordId
        },
        data: {
            isDeleted: true
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
        omit:{
            description:true,
            bedRoom:true,
            bathRoom:true,
            squareFeet:true,
            amenities:true,
            city:true,
            division:true,
            createdAt:true,
            updatedAt:true,
            isDeleted:true,
            categoryId:true,
            landlordId:true
        },
        include: {
            rentRequest: {
                omit:{
                    propertyId:true
                },
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
            },
            _count:{
                select:{
                    rentRequest:true
                }
            }
        },
        
    })



    return rentalRequests

}

const updatedPropertyAvailabilityStatus = async (propertyId: string, landlordId: string, payload: PropertyAvailablity) => {


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
        data: {
            availablity: payload
        }

    })
    return updatedProperty
}

const updateRentalRequestStatusIntoDb = async (
    rentalRequestId: string,
    status: RentRequestStatus) => {

 

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            const updateRequestStatus = await tx.rentRequest.update({
                where: {
                    id: rentalRequestId
                },
                data: {
                    status: status
                },
                include: {
                    property: {
                        select: {
                            availablity: true
                        }
                    }
                }
            })


            if (updateRequestStatus.status === RentRequestStatus.APPROVED) {

                await tx.property.update({
                    where: {
                        id: updateRequestStatus.propertyId
                    },
                    data: {
                        availablity: PropertyAvailablity.RENTED
                    }
                })
            }
            if (updateRequestStatus.status === RentRequestStatus.REJECTED) {

                await tx.property.update({
                    where: {
                        id: updateRequestStatus.propertyId
                    },
                    data: {
                        availablity: PropertyAvailablity.AVAILABLE
                    }
                })
            }

            return updateRequestStatus
        }
    )

    const approvedRequestInfo = await prisma.rentRequest.findUniqueOrThrow({
        where: {
            id: transactionResult.id
        },
        include: {
            property: {
                select: {
                    availablity: true
                }
            }
        }
    })
    return approvedRequestInfo
}



export const landLordServices = {
    createPropertyIntoDb,
    updatePropertyIntoDb,
    revomePropertyFromDb,
    getAllLandlordsRentalRequestsFromDb,
    updatedPropertyAvailabilityStatus,
    updateRentalRequestStatusIntoDb
}


