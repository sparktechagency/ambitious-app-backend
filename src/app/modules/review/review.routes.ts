import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewZodValidationSchema } from "./review.validation";
import { JwtPayload } from "jsonwebtoken";
const router = express.Router();

router.post("/",
    auth(USER_ROLES.SELLER, USER_ROLES.CUSTOMER),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {rating, ...othersData } = req.body;
            const user =  req.user as JwtPayload
            req.body = { ...othersData, user: user.id, rating: Number(rating)};
            next();
            
        } catch (error) {
            res.status(500).json({ message: "Failed to convert string to number" });
        }
    },
    validateRequest(reviewZodValidationSchema),
    ReviewController.createReview
);

router.get("/",
    ReviewController.getReviews
)


export const ReviewRoutes = router;