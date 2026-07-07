import { Availablity, PropertyAvailablity } from "../../../generated/prisma/enums";

export interface ICreateNewProperty {
    title: string;
    description: string;
    address: string;
    city: string;
    division: string;
    bedRoom?: number;
    bathRoom?: number;
    squareFeet: number;
    rentAmount: number;
    isAvailable: PropertyAvailablity;
    categoryId: string
}


export interface IUpdateProperty {
    title?: string;
    description?: string;
    address?: string;
    city?: string;
    division?: string;
    bedRoom?: number;
    bathRoom?: number;
    squareFeet?: number;

    balcony: Availablity;
    BuiltInWardrobes: Availablity;
    parking: Availablity;
    modularkitchen: Availablity;
    lift: Availablity;
    GasPipeline: Availablity;
    airConditioning: Availablity;
    powerBackup: Availablity;

    rentAmount?: number;
    isAvailable?: PropertyAvailablity;
    categoryId?: string
}
