import { PropertyAvailablity } from "../../../generated/prisma/enums";
import { PropertyWhereInput } from "../../../generated/prisma/models";
import AppError from "../../errorHelper/appError";
import { prisma } from "../../lib/prisma";
import { IGetPropertyQuery } from "./properties.interface";
import httpStatus from 'http-status'

const getAllPropertyFromDb = async (query: IGetPropertyQuery) => {

    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";

    const amenities = query.amenities ? JSON.parse(query.amenities as string) : null;
    const arrayOfAmenities = Array.isArray(amenities) ? amenities : []
    const andCondition: PropertyWhereInput[] = []


    if (query.searchTerm) {
        andCondition.push({
            OR: [
                {
                    title: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    address: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    city: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    division: {
                        contains: query.searchTerm,
                        mode: "insensitive"
                    }
                }

            ]
        })
    }



    // search end

    // fileter

    if (query.location) {
        andCondition.push({
            city: {
                equals: query.location,
                mode: "insensitive"
            }
        })
    }

    if (query.price) {
        andCondition.push({
            rentAmount: Number(query.price)
            
        })
    }
    if (query.priceRange) {
        andCondition.push({
            rentAmount: {
                lte: Number(query.priceRange)
            }
        })
    }

    if (query.type) {
        const category = await prisma.category.findUnique({
            where: {
                name: query.type
            }
        })
        if (!category) {
            throw new AppError(httpStatus.NOT_FOUND, "Property Type Not Found!");

        }

        andCondition.push({ categoryId: category.id })
    }

    if(query.amenities){
        andCondition.push({
            amenities:{
                hasSome:arrayOfAmenities
            }
        })
    }

    andCondition.push({
        availablity: PropertyAvailablity.AVAILABLE
    })
    andCondition.push({
        isDeleted: false
    })
    
    const properties = await prisma.property.findMany({
        where: {
            AND: andCondition
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            landlord: {
                select: {
                    name: true,
                    email: true,
                    profile: {
                        select: {
                            phoneNumber: true
                        }
                    },

                },
            },
            category: {
                select: {
                    name: true
                }
            }

            // reviwes: true
        },

    })

    const totalPropertyCount = await prisma.property.count({
        where: { AND: andCondition }
    })

    return {
        data: properties,
        meta: {
            page: page,
            limit: limit,
            total: Math.ceil(totalPropertyCount)
        }
    }

    // end

}


const getPropertyByIdFromDb = async (propertyId: string) => {



    const propertyDetails = await prisma.property.findUniqueOrThrow({
        where: {
            id: propertyId,
        },
        include: {
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
        },

    })

    if(propertyDetails.isDeleted === true){
        throw new AppError(httpStatus.NOT_FOUND,"Sorry! Property is deleted");  
    }
    return propertyDetails
}

export const propertyServices = {
    getAllPropertyFromDb,
    getPropertyByIdFromDb
}