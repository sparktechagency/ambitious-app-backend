import express from 'express'
import { USER_ROLES } from '../../../enums/user'
import auth from '../../middlewares/auth'
import { CategoryController } from './category.controller'
const router = express.Router()

router.route('/')
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CategoryController.createCategory,
  )
  .get(CategoryController.getCategories)

router.route('/:id')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CategoryController.updateCategory,
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    CategoryController.deleteCategory,
  );

export const CategoryRoutes = router