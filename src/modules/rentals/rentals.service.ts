import AppError from "../../errorHelper/appError";
import { prisma } from "../../lib/prisma"
import httpStatus from 'http-status'

const submitRentalRequestIntoDb = async (tenantId: string, propertyId: string) => {

    const isTenantIdhasAnyrequestBefore = await prisma.rentRequest.findFirst(
        {
            where: {
                tenantId, propertyId
            }
        }
    )

    if (isTenantIdhasAnyrequestBefore) {
        throw new AppError(httpStatus.CONFLICT, "You Already submit a request on this property");
    }

    const isPropartyAvailable = await prisma.property.findUnique({
        where: {
            id: propertyId,
        }
    })

    if (!isPropartyAvailable) {
        throw new AppError(httpStatus.CONFLICT, "Property Not Found");
    }
    if (isPropartyAvailable.availablity === "BOOKED") {
        throw new AppError(httpStatus.CONFLICT, "Property Already Booked");
    }

    const submitRequestData = await prisma.rentRequest.create({
        data: {
            tenantId,
            propertyId
        }
    })



    const requester = await prisma.rentRequest.findUnique({
        where: {
            id: submitRequestData.id,
            tenantId: submitRequestData.tenantId,
            propertyId: submitRequestData.propertyId
        },
        include: {
            tenant: {
                omit: {
                    password: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    })

    const requestedProperty = await prisma.property.findUnique({
        where: {
            id: submitRequestData.propertyId
        },
        select: {
            title: true,
            description: true,
            address: true,
            city: true,
            division: true,
            rentAmount: true,
            bedRoom: true,
            bathRoom: true,
            squareFeet: true,
            category: {
                select: {
                    name: true
                }
            },
            landlord: {
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
        }
    })

    return { requestedProperty, requester }
}

const getUserRentalRequestFromDb = async (tenantId: string) => {

    const userRentalRequests = await prisma.rentRequest.findMany({
        where: {
            tenantId,
        },
        include: {
            property: {
                include: {
                    landlord: {
                        omit: {
                            id: true,
                            password: true,
                            status: true,
                            role: true,
                            createdAt: true,
                            updatedAt: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }

                },
                omit: {
                    landlordId: true,
                    categoryId: true,
                    createdAt: true,
                    updatedAt: true
                }

            },
        },
        omit: {
            tenantId: true,
            propertyId: true,
            // createdAt: true,
            updatedAt: true
        }
    })

    return userRentalRequests
}

const getRentalRequestDetailsByIdFromDb = async (requestId: string) => {
    const rentalRequest = await prisma.rentRequest.findUniqueOrThrow({
        where: {
            id: requestId
        },
        include: {
            property: {
                include: {
                    landlord: {
                        select: {
                            name: true,
                            email: true,
                            profile: {
                                select: {
                                    phoneNumber: true
                                }
                            }
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            },

        }
    })

    return rentalRequest
}



export const rentalRequestServices = {
    submitRentalRequestIntoDb,
    getUserRentalRequestFromDb,
    getRentalRequestDetailsByIdFromDb
}