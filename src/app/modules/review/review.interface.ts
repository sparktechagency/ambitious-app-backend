import { Model, Types } from "mongoose";

export type IReview = {
    seller: Types.ObjectId;
    comment: string;
    rating: number;
}

export type ReviewModel = Model<IReview>;