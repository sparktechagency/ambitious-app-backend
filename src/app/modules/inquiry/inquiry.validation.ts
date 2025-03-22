import { z } from 'zod';
import { checkValidID } from '../../../shared/checkValidID';

export const InquiryZodValidations = z.object({
    body: z.object({
        seller: checkValidID("Seller is required"),
        message: z.string({required_error: "Message is Required"})
    }),
});