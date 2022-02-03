import { NextFunction } from "express";
import CategoryModel from "../category/models";
import TransactionModel from "./models";

export async function createTransaction(
  userId: string,
  categoryId: string,
  amount: number,
  note: string,
  date: Date,
  year: number,
  next: NextFunction
): Promise<any> {
  try {
    const newTransactionItem = await TransactionModel.create({
      userId,
      categoryId,
      amount,
      note,
      date,
      year,
    });
    return newTransactionItem.get();
  } catch (error) {
    return next(error);
  }
}

export async function deleteTransaction(
  transactionId: string,
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const transactionToDelete = await TransactionModel.findOne({
      where: { transactionId, userId },
    });
    transactionToDelete.destroy();
    return transactionToDelete.get();
  } catch (error) {
    return next(error);
  }
}

export async function getTransactionsByYear(
  year: string,
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const allTransaction = await TransactionModel.findAll({
      where: {
        userId,
        year,
      },
      include: [
        {
          model: CategoryModel,
          attributes: ["categoryId", "category"],
        },
      ],
      order: [["date", "DESC"]],
    });
    return allTransaction;
  } catch (error) {
    return next(error);
  }
}

export async function getAllTransactionsByUser(
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const allTransaction = await TransactionModel.findAll({
      where: {
        userId,
      },
      order: [["date", "DESC"]],
    });
    return allTransaction;
  } catch (error) {
    return next(error);
  }
}

export async function updateTransaction(
  userId: string,
  transactionId: string,
  updateObject: any,
  next: NextFunction
) {
  try {
    const transactionToUpdate = await TransactionModel.update(updateObject, {
      returning: true,
      where: {
        transactionId,
        userId,
      },
    });
    return transactionToUpdate[1][0];
  } catch (error) {
    return next(error);
  }
}
