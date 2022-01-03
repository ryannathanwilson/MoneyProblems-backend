import { NextFunction } from "express";
import { Error } from "sequelize";
import CategoryModel from "./models";

export async function createCategory(
  userId: string,
  category: string,
  next: NextFunction
): Promise<any> {
  try {
    const newCategory = await CategoryModel.create({
      userId,
      category,
    });
    return newCategory.get();
  } catch (error) {
    return next(error);
  }
}

export async function deleteCategory(
  categoryId: string,
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const categoryToDelete = await CategoryModel.findOne({
      where: { categoryId },
    });
    categoryToDelete.destroy();
    return categoryToDelete.get();
  } catch (error) {
    return next(error);
  }
}

export async function getAllCategoriesByUser(
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const allCategories = await CategoryModel.findAll({
      where: {
        userId,
      },
      order: [["category", "ASC"]],
    });
    return allCategories;
  } catch (error) {
    return next(error);
  }
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  updateObject: any,
  next: NextFunction
) {
  try {
    const categoryToUpdate = await CategoryModel.findOne({
      where: {
        categoryId,
        userId,
      },
    });
    if (categoryToUpdate) {
      const updatedCategory = await categoryToUpdate.update(updateObject);
      return updatedCategory.get();
    }
    throw Error;
  } catch (error) {
    return next(error);
  }
}
