import { PropertyWhereInput } from "../../../generated/prisma/models";

export interface IGetPropertyQuery extends PropertyWhereInput{
    searchTerm?:string;
    page?:string;
    limit?:string;
    sortBy?:string;
    sortOrder?:string;
    location?:string;
    price?:string;
    type?:string;
    priceRange?:string
}