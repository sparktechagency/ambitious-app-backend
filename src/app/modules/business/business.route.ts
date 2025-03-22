import express, { NextFunction, Request, Response } from 'express';
import { BusinessController } from './business.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BusinessZodValidationSchema } from './business.validation';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
import { JwtPayload } from 'jsonwebtoken';
import { getMultipleFilesPath, getSingleFilePath } from '../../../shared/getFilePath';

const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.SELLER),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {

            try {
                const user = req.user as JwtPayload;
                const { revenue, price, employees, ...otherPayload } = req.body;
                const logo = getSingleFilePath(req.files, "image");
                const image = getMultipleFilesPath(req.files, "image");
                const doc = getMultipleFilesPath(req.files, "doc");

                req.body = {
                    seller: user.id,
                    revenue: Number(revenue) ?? undefined,
                    price: Number(price) ?? undefined,
                    employees: Number(employees) ?? undefined,
                    logo,
                    image,
                    doc,
                    ...otherPayload
                };
                next();

            } catch (error) {
                res.status(500).json({ message: "Failed to convert string to number" });
            }
        },
        validateRequest(BusinessZodValidationSchema),
        BusinessController.createBusiness
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BusinessController.businessList
    );

router.get("/listing",
    BusinessController.businessEveryone
)

router.get("/details",
    auth(USER_ROLES.SELLER, USER_ROLES.CUSTOMER),
    BusinessController.businessDetails
)

router.route('/:id')
    .patch(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BusinessController.approvedBusiness
    )
    .get(
        BusinessController.businessDetailsForCustomer
    )


export const BusinessRoutes = router;
