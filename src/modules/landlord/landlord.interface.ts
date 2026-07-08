import { Availablity, PropertyAvailablity } from "../../../generated/prisma/enums";

export interface ICreateNewProperty {
    title: string;
    description: string;
    address: string;
    city: string;
    division: string;
    bedRoom?: number;
    bathRoom?: number;
    amenities?: string[];
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
    amenities?: string[];
    rentAmount?: number;
    isAvailable?: PropertyAvailablity;
    categoryId?: string
}

