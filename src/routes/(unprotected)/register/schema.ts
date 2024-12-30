import {z, ZodEnum} from "zod";

export const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    name: z.string(),
    role: z.enum(["ADMIN", "USER", "GUEST"])

});

export type FormSchema = typeof formSchema;