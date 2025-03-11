import { z } from 'zod';

export const InquiryZodValidations = z.object({
    body: z.object({
        name: z.string({required_error: 'Name is required'}),
        email: z.string({required_error: "Email is Required"}).email({message: "Invalid Email"}),
        phone: z.string({required_error: "Phone is Required"}),
        message: z.string({required_error: "Message is Required"})
    }),
});