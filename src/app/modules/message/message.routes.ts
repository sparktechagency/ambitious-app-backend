import express, { Request, Response, NextFunction } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { MessageController } from './message.controller';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
import validateRequest from '../../middlewares/validateRequest';
import { MessageZodSchema } from './message.validation';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { JwtPayload } from 'jsonwebtoken';
const router = express.Router();

router.post('/',
  auth(USER_ROLES.CUSTOMER, USER_ROLES.SELLER),
  fileUploadHandler(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = getSingleFilePath(req.files, "image");
      const doc = getSingleFilePath(req.files, "doc");

      req.body = {
        ...req.body,
        image: image,
        doc: doc,
        sender: (req.user as JwtPayload).id,
      };

      next();
    } catch (error) {
      res.status(500).json({ message: "Invalid Image upload" });
    }
  },
  validateRequest(MessageZodSchema),
  MessageController.sendMessage
);
router.get(
  '/:id',
  auth(USER_ROLES.CUSTOMER, USER_ROLES.SELLER),
  MessageController.getMessage
);

export const MessageRoutes = router;
