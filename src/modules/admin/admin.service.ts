import { ActiveStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const getAllUserFromDb = async () => {
    const users = prisma.user.findMany({
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });
    return users

}

const updateUserStatusIntoDb = async (userId: string, status: ActiveStatus) => {
    const updatedStatusData = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            status
        },
        omit: {
            password: true
        }
    })

    return updatedStatusData
}

const getAllPropertiesFromDb = async () => {

    const properties = await prisma.property.findMany({
        // todo if have time
        // take:2,
        // skip:
        include: {
            landlord: {
                omit: {
                    password: true
                }
            },
            category: true,

        },

    })
    return properties

}

const getAllRentalRequesFromDb = async () => {
    const rentalReques = await prisma.rentRequest.findMany({
        include: {
            property: {
                include: {
                    landlord: {
                        omit: {
                            password: true
                        }
                    }
                },

            },
            tenant: {
                omit: {
                    password: true
                }

            }
        }
        
    });
    return rentalReques
}


export const adminServices = {
    getAllUserFromDb,
    updateUserStatusIntoDb,
    getAllPropertiesFromDb,
    getAllRentalRequesFromDb
}