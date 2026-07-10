import z from "zod";

export const submitPaymentSchema = z.object(
    {
         requestId: z
                .string("Request ID is required")
                .uuid("Invalid Request ID format"),
    }
)