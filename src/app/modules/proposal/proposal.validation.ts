import { z } from 'zod';
import { checkValidID } from '../../../shared/checkValidID';

export const proposalZodValidationSchema = z.object({
    body: z.object({
        business: checkValidID("Business is required"),
        price: z.number({ required_error: "Price is required" }).nonnegative({ message: "Price must be a positive number" })
    })
});