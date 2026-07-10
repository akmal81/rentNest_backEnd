import z from "zod";

export const createPropertyPayloadSchema = z.object({
    title: z
        .string("Title is required")
        .min(1, "Title cannot be empty"),
    description: z
        .string("Description is required")
        .min(1, "Description cannot be empty"),
    address: z
        .string("Address is required")
        .min(1, "Address cannot be empty"),
    city: z
        .string("City is required")
        .min(1, "City cannot be empty"),
    division: z
        .string("Division is required")
        .min(1, "Division cannot be empty"),
    bedRoom: z
        .int()
        .positive("Bedrooms must be a positive number")
        .optional(),
    bathRoom: z
        .int()
        .positive("Bathrooms must be a positive number")
        .optional(),
    squareFeet: z
        .number()
        .positive("Square feet must be a positive number")
        .optional(),
    amenities: z
        .array(z.string())
        .min(1, "At least one amenity must be selected"),
    rentAmount: z
        .number("Rent amount is required")
        .positive("Rent amount must be a positive number"),
    categoryId: z
        .string("Category ID is required")
        .uuid("Invalid Category ID format"),
});



export const updatePropertyPayloadSchema = z.object({
    title: z
        .string("Title must be string")
        .optional(),
    description: z
        .string("Descrption must be string")
        .optional(),
    address: z
        .string("Address must be string")
        .optional(),
    city: z
        .string("City must be string")
        .optional(),
    division: z
        .string("Division must be string")
        .optional(),
    bedRoom: z
        .number()
        .int()
        .positive("Bedrooms must be a positive number")
        .optional(),
    bathRoom: z
        .number()
        .int()
        .positive("Bathrooms must be a positive number")
        .optional(),
    squareFeet: z
        .number()
        .positive("Square feet must be a positive number")
        .optional(),
    amenities: z
        .array(z.string())
        .optional(),
    rentAmount: z
        .number()
        .positive("Rent amount must be a positive number")
        .optional(),
    availablity: z
        .string("availablity must be string")
        .optional(),
    isDeleted: z
        .boolean("isDeleted must be true of false")
        .optional(),
    categoryId: z
        .string()
        .uuid("Invalid Category ID format")
        .optional(),
});


export const updatedPropertyAvailabilitySchema = z.object({

})