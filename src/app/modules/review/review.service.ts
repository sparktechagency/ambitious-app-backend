import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";

const createReviewToDB = async(payload:IReview): Promise<IReview>=>{

    const result = await Review.create(payload);
    if(!result){
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed To create Review")
    }
    return payload;
};

const getReviewsFromDB = async(): Promise<IReview[]>=>{

    const results = await Review.find({}).populate('user', 'name email role profile');
    return results;
};


export const ReviewService ={ 
    createReviewToDB,
    getReviewsFromDB
}