import { z } from 'zod';

export const createReviewsPayloadSchema = z.object({
    content: z.string("Content is required").min(1, "Content cannot be empty"),

    rentalRequesId: z.string("Rental Request ID is required"),

    propertyId: z.string("Property ID is required"),
});

