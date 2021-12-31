import { NextFunction } from "express";
import CategoryModel from "./models";

export async function createCategory(
  userId: string,
  category: string,
  next: NextFunction
): Promise<any> {
  console.log(`user: ${userId}`);
  console.log(`category: ${category}`);
  try {
    const newCategory = await CategoryModel.create({
      userId,
      category,
    });
    return newCategory.get();
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export async function deleteCategory(categoryId: string): Promise<any> {
  try {
    const categoryToDelete = await CategoryModel.findOne({
      where: { categoryId },
    });
    categoryToDelete.destroy();
    return categoryToDelete.get();
  } catch (error) {
    console.log(error);
    return "failed to delete";
  }
}

export async function getAllCategoriesByUser(userId: string): Promise<any> {
  console.log(`userId: ${userId}`);
  try {
    const allCategories = await CategoryModel.findAll({
      where: {
        userId,
      },
    });
    return allCategories;
  } catch (error) {
    return "call failed";
    console.log(error);
  }
}
