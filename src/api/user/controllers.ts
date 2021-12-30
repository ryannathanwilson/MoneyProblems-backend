import { Model } from "sequelize/dist";
import { User } from "./models";

interface UserInterface {
  username: string;
  email: string;
  password: string;
}

export async function createUser(user: UserInterface): Promise<boolean> {
  const { username, email, password } = user;
  try {
    await User.create({
      username,
      email,
      password,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteUser(userId: string): Promise<Model> {
  try {
    const userToDelete = await User.findOne({ where: { userId } });
    userToDelete.destroy;
    return userToDelete.get();
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers(): Promise<Model[]> {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(userId: string): Promise<Model> {
  try {
    const user = await User.findOne({ where: { userId } });
    return user.get();
  } catch (error) {
    console.log(error);
  }
}
