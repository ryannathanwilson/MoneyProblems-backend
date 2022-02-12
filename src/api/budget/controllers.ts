import { NextFunction } from "express";
import CategoryModel from "../category/models";
import BudgetModel from "./models";

export async function createBudget(
  userId: string,
  categoryId: string,
  amount: number,
  month: number,
  year: number,
  next: NextFunction
): Promise<any> {
  try {
    const newBudgetItem = await BudgetModel.create({
      userId,
      categoryId,
      amount,
      month,
      year,
    });
    return newBudgetItem.get();
  } catch (error) {
    return next(error);
  }
}

export async function deleteBudget(budgetId: string): Promise<any> {
  try {
    const budgetToDelete = await BudgetModel.findOne({ where: { budgetId } });
    budgetToDelete.destroy();
    return budgetToDelete.get();
  } catch (error) {
    console.log(error);
    return "failed to delete";
  }
}

export async function getAllBudgetsByUser(userId: string): Promise<any> {
  try {
    const allBudgets = await BudgetModel.findAll({
      where: {
        userId,
      },
    });
    return allBudgets;
  } catch (error) {
    console.log(error);
    return "call failed";
  }
}

export async function getBudgetByYear(
  year: string,
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const allBudgets = await BudgetModel.findAll({
      where: {
        userId,
        year,
      },
      include: [
        {
          model: CategoryModel,
          as: "category",
        },
      ],
    });
    return allBudgets;
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export async function getBudgetByMonth(
  month: string,
  year: string,
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const allBudgets = await BudgetModel.findAll({
      where: {
        userId,
        year,
        month,
      },
      // include: [
      // {
      // model: CategoryModel,
      // as: "category",
      // },
      // ],
    });
    return allBudgets;
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export async function updateBudget(
  userId: string,
  budgetId: string,
  updateObject: any,
  next: NextFunction
) {
  try {
    const budgetToUpdate = await BudgetModel.update(updateObject, {
      returning: true,
      where: {
        budgetId,
        userId,
      },
    });
    return budgetToUpdate[1][0];
  } catch (error) {
    return next(error);
  }
}
