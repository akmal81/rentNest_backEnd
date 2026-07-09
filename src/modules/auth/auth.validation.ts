import { z } from 'zod';

export const createUserPayloadSchema = z.object({
    name: z.string("Name is required").min(1, "Name cannot be empty"),
    
    email: z.string("Email is required").email("Invalid email address"),
    
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long"),
    
    role: z.string().optional(),
    
    status: z.string().optional(),
    
    profilePhoto: z.string().url("Invalid URL format").optional(),
});


export const userLoginPayloadSchema = z.object({
    email: z.string("Email is required").email("Invalid email address"),
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long"),
});

