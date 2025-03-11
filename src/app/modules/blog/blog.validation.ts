import { z } from 'zod';

export const BlogZodValidations = z.object({
    body: z.object({
        title: z.string({required_error: 'Title is required'}),
        content: z.string({required_error: "Content is Required"}),
        image: z.string({required_error: "Image is Required"})
    })
});
