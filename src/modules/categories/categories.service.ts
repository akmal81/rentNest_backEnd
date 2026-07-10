
import { prisma } from "../../lib/prisma";
import { ICategories } from "./categories.interface";

const createCategory = async (payload:ICategories) => {
    const createdCategory = await prisma.category.create({
        data:{...payload}
    })
    return createdCategory
}

const getAllcategories =async()=>{
    const  allcategories = await prisma.category.findMany({
        include:{
            _count:{
                select:{
                    properties:true
                }
            },
           
        }
    })
    return allcategories
}

export const categoryServices = {
    createCategory,
    getAllcategories
}

