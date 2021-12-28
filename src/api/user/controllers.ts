import {Model} from "sequelize/dist"
import {User} from "./models"

interface UserInterface {
  username: string
  email: string
  password: string
}

export async function createUser(user: UserInterface):Promise<Model> {
  const {username, email, password} = user
  try {
    const ryan = await User.create({
      username,
      email,
      password,
    })
    return ryan.get()
  } catch(error) {
    console.log(error)
  }
}

export async function deleteUser(userId: string):Promise<Model> {
  try {
    const userToDelete = await User.findOne({ where: { userId: userId}})
    userToDelete.destroy
    return userToDelete.get()
  } catch(error) {
    console.log(error)
  }
}

export async function getAllUsers():Promise<Model[]> {
  try {
    const allUsers = await User.findAll()
    return allUsers
  } catch(error) {
    console.log(error)
  }
}

export async function getUser(userId: string):Promise<Model> {
  try {
    const user = await User.findOne({where: {userId: userId}})
    return user.get()
  } catch(error) {
    console.log(error)
  }
}


