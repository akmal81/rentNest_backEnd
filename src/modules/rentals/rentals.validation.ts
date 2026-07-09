import z from "zod";

export const createRentalsRequestSchema = z.object(
    {
         propertyId: z
                .string("Property ID is required")
                .uuid("Invalid Category ID format"),
    }
)