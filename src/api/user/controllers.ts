import { NextFunction } from "express";
import { Model } from "sequelize/dist";
import UserModel from "./models";

interface UserInterface {
  username: string;
  email: string;
  password: string;
}

export async function createUser(
  user: UserInterface,
  next: NextFunction
): Promise<Model | void> {
  const { username, email, password } = user;
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
    });
    delete newUser.get().password;
    return newUser.get();
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(userId: string): Promise<any> {
  try {
    const userToDelete = await UserModel.findOne({ where: { userId } });
    userToDelete.destroy();
    return userToDelete.get();
  } catch (error) {
    console.log(error);
    return "fail";
  }
}

export async function getAllUsers(): Promise<any> {
  try {
    const allUsers = await UserModel.findAll();
    return allUsers;
  } catch (error) {
    console.log(error);
    return "fail";
  }
}

export async function getUser(userId: string): Promise<any> {
  try {
    const user = await UserModel.findOne({ where: { userId } });
    return user.get();
  } catch (error) {
    console.log(error);
    return "fail";
  }
}
