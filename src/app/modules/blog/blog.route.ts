import express, { NextFunction, Request, Response } from "express";
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BlogZodValidations } from './blog.validation';
import { BlogController } from './blog.controller';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
import { getSingleFilePath } from "../../../shared/getFilePath";

const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
        fileUploadHandler(),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const image = getSingleFilePath(req.files, "image");
                req.body = { image, ...req.body };
                next();

            } catch (error) {
                res.status(500).json({ message: "Failed to Upload Image" });
            }
        },
        validateRequest(BlogZodValidations),
        BlogController.createBlog
    )
    .get(
        BlogController.getBlogs
    );

export const BlogRoutes = router;
