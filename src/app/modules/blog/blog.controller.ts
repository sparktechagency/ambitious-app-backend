import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BlogServices } from './blog.service';

const createBlog = async (req: Request, res: Response) => {
    const result = await BlogServices.createBlogInDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Inquiry Created Successfully',
        data: result
    })
}

const getBlogs = async (req: Request, res: Response) => {
    const result = await BlogServices.getBlogsFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Blogs Retrieved Successfully',
        data: result
    })
}

export const BlogController = {
    createBlog,
    getBlogs
};