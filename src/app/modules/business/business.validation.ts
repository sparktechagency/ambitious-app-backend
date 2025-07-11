import { z } from 'zod';
import { checkValidID } from '../../../shared/checkValidID';

export const BusinessZodValidationSchema = z.object({
    body: z.object({
        category: checkValidID("Category is Required"),
        name: z.string({ required_error: "Name is Required" }),
        description: z.string({ required_error: "Description is Required" }),
        logo: z.string({ required_error: "Logo is Required" }),
        location: z.string({ required_error: "Location is Required" }),
        email: z.string({ required_error: "Email is required" }).email({ message: "Invalid Email" }),
        phone: z.string({ required_error: "Phone is Required" }),
        website: z.string({ required_error: "Website is Required" }),
        ownership: z.enum(["Sole Proprietorship", "Partnership", "Limited Partnership", "Limited Liability Partnership", "Private Limited Company"], { required_error: "Ownership is Required" }),
        revenue: z.number({ required_error: "Revenue is Required" }).nonnegative({ message: "Revenue Must include Positive value" }),
        price: z.number({ required_error: "Price is Required" }).nonnegative({ message: "Price Must include Positive value" }),
        employees: z.number({ required_error: "Employees is Required" }).nonnegative({ message: "Revenue Must include Positive value" }),
        founded: z.string({ required_error: "Founded is Required" }),
        country: z.string({ required_error: "Country is Required" }),
        city: z.string({ required_error: "City is Required" }),
    })
});