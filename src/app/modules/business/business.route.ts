import express from 'express';
import { BusinessController } from './business.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BusinessZodValidationSchema } from './business.validation';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';

const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.SELLER),
        validateRequest(BusinessZodValidationSchema),
        fileUploadHandler(),
        BusinessController.createBusiness
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BusinessController.businessList
    );

router.route('/:id')
    .patch(
        auth(USER_ROLES.SELLER),
        BusinessController.approvedBusiness
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        BusinessController.businessDetails
    )

export const BusinessRoutes = router;
