
import express, { Request, Response, NextFunction } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { TransactionController } from './transaction.controller';
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.CUSTOMER),
        TransactionController.makePayment
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        TransactionController.transactions
    )

export const TransactionRoutes = router;    