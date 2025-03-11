import QueryBuilder from '../../../helpers/QueryBuilder';
import { BlogModel, IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogInDB = async (payload: BlogModel): Promise<IBlog> => {
    const blog = await Blog.create(payload);
    if (!blog) {
        throw new Error('Blog could not be created');
    }
    return blog;
}

const getBlogsFromDB = async (query: Record<string, any>): Promise<{ blogs: IBlog[], pagination: any }> => {

    const result = new QueryBuilder(Blog.find({}), query).paginate();
    const blogs = await result.queryModel;
    const pagination = await result.getPaginationInfo();

    return { blogs, pagination };
}

export const BlogServices = {
    createBlogInDB,
    getBlogsFromDB
};