import UserModel from "./models";

interface UserInterface {
  username: string;
  email: string;
  password: string;
}

export async function createUser(user: UserInterface): Promise<boolean> {
  const { username, email, password } = user;
  try {
    await UserModel.create({
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
