import z from "zod";

export const createCategoryPayloadSchema = z.object({
    name: z.string("Category name is required").min(1, "Name cannot be empty"),
    description: z.string("Description is required").min(1, "Description cannot be empty")
});