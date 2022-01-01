import { NextFunction } from "express";
import TransactionModel from "./models";

export async function createTransaction(
  userId: string,
  categoryId: string,
  amount: number,
  date: Date,
  year: number
  next: NextFunction
): Promise<any> {
  try {
    const newTransactionItem = await TransactionModel.create({
      userId,
      categoryId,
      amount,
      date,
      year,
    });
    return newTransactionItem.get();
  } catch (error) {
    return next(error);
  }
}

export async function deleteTransaction(
  budgetId: string,
  userId: string,
  next: NextFunction
): Promise<any> {
  try {
    const transactionToDelete = await TransactionModel.findOne({
      where: { budgetId },
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
    });
    return allTransaction;
  } catch (error) {
    return next(error);
  }
}
