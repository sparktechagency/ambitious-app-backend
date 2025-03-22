import mongoose from 'mongoose';
import QueryBuilder from '../../../helpers/QueryBuilder';
import { BlogModel, IBlog } from './blog.interface';
import { Blog } from './blog.model';
import ApiError from '../../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';

const createBlogInDB = async (payload: BlogModel): Promise<IBlog> => {
    const blog = await Blog.create(payload);
    if (!blog) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Blog could not be created');
    }
    return blog;
}

const getBlogsFromDB = async (query: Record<string, any>): Promise<{ blogs: IBlog[], pagination: any }> => {

    const result = new QueryBuilder(Blog.find({}), query).paginate();
    const blogs = await result.queryModel;
    const pagination = await result.getPaginationInfo();

    return { blogs, pagination };
}

const deleteBlogFromDB = async (id: string): Promise<IBlog> => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Blog ID');
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Blog could not be deleted');
    }
    return blog;
}

const updateBlogInDB = async (id: string, payload: BlogModel): Promise<IBlog> => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Blog ID");
    }
    const blog = await Blog.findByIdAndUpdate(id, payload, { new: true });
    if (!blog) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Blog could not be updated');
    }
    return blog;
}

export const BlogServices = {
    createBlogInDB,
    getBlogsFromDB,
    deleteBlogFromDB,
    updateBlogInDB
};