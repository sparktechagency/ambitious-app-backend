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

const deleteBlog = async (req: Request, res: Response) => {
    const result = await BlogServices.deleteBlogFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog Deleted Successfully',
        data: result
    })
}

const updateBlog = async (req: Request, res: Response) => {
    const result = await BlogServices.updateBlogInDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog Updated Successfully',
        data: result
    })
}

export const BlogController = {
    createBlog,
    getBlogs,
    deleteBlog,
    updateBlog
};