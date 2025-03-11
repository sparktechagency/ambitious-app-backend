import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiErrors'
import { ICategory } from './category.interface'
import { Category } from './category.model'
import mongoose from 'mongoose'

const createCategoryToDB = async (payload: ICategory) => {
  if (!payload.name) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category Name is Required");
  }
  const isExistName = await Category.findOne({ name: name })

  if (isExistName) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "This Category Name Already Exist");
  }

  const createCategory: any = await Category.create(payload)
  if (!createCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Category')
  }

  return createCategory
}

const getCategoriesFromDB = async (): Promise<ICategory[]> => {
  const result = await Category.find({})
  return result;
}

const updateCategoryToDB = async (id: string, payload: ICategory) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Category Id");
  }

  const updateCategory = await Category.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true
    }
  )

  if (!updateCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category updated Failed");
  }

  return updateCategory
}

const deleteCategoryToDB = async (id: string): Promise<ICategory | null> => {
  const deleteCategory = await Category.findByIdAndDelete(id)
  if (!deleteCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category doesn't exist")
  }
  return deleteCategory
}

export const CategoryService = {
  createCategoryToDB,
  getCategoriesFromDB,
  updateCategoryToDB,
  deleteCategoryToDB
}
