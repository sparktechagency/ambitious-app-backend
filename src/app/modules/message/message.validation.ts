import { z } from 'zod';
import { checkValidID } from '../../../shared/checkValidID';

export const MessageZodSchema = z.object({
    body: z.object({
        chatId: checkValidID("Chat ID is required"),
        text: z.string().optional(),
        image: z.string().optional(),
        icon: z.string().optional(),
        video: z.string().optional(),
        type: z.enum(['text', 'image', 'video', 'icon', 'both']).optional(),
    })
});
