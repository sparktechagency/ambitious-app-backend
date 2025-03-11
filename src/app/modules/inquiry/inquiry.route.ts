import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { InquiryZodValidations } from './inquiry.validation';
import { InquiryController } from './inquiry.controller';

const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.SELLER),
        validateRequest(InquiryZodValidations),
        InquiryController.createInquiry
    )
    .get(
        InquiryController.getInquiries
    );
    
export const InquiryRoutes = router;
