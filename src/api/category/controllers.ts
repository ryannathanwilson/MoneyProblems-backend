import CategoryModel from "./models";

export async function createCategory(
  userId: string,
  category: string
): Promise<boolean> {
  console.log(`user: ${userId}`);
  console.log(`category: ${category}`);
  try {
    await CategoryModel.create({
      userId,
      category,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
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
