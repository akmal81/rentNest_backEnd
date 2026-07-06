import AppError from "../../errorHelper/appError";
import { prisma } from "../../lib/prisma"
import httpStatus from 'http-status'

const submitRentalRequestIntoDb = async (tenantId:string, propertyId:string) => {
    
    const isPropartyAvailable = await prisma.property.findUnique({
        where:{
            id:propertyId
        }
    })

    if (!isPropartyAvailable) {
        throw new AppError(httpStatus.CONFLICT, "Property Not Found");
    }
    if (isPropartyAvailable.availablity === "BOOKED") {
        throw new AppError(httpStatus.CONFLICT, "Property Already Booked");
    }

    const submitRequestData =  await prisma.rentRequest.create({
        data:{
            tenantId,
            propertyId
        }
    })
    const requester = await prisma.rentRequest.findUnique({
        where:{
            id:submitRequestData.id,
            tenantId:submitRequestData.tenantId,
            propertyId:submitRequestData.propertyId
        },
        include:{
            tenant:{
                    omit:{
                    password:true,
                    createdAt:true,
                    updatedAt:true
                }
            }
        }
    })
    
    const requestedProperty = await prisma.property.findUnique({
        where:{
            id:submitRequestData.propertyId
        },
        select:{
            title:true,
            description:true,
            address:true,
            city:true,
            division:true,
            rentAmount:true,
            bedRoom:true,
            bathRoom:true,
            squareFeet:true,
            category:{
                select:{
                    name:true
                }
            },
            landlord:{
                select:{
                    name:true,
                    email:true,
                    profile:{
                        select:{
                            phoneNumber:true
                        }
                    }
                }
            }
        }
    })

    return {requestedProperty, requester}
}

export const rentalRequestServices = {
    submitRentalRequestIntoDb,
    
}