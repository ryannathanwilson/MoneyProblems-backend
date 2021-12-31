import { DataTypes, UUIDV4 } from "sequelize";
import BudgetModel from "../budget/models";
import { sequelize, commonModelOption } from "../sequelize";

const CategoryModel = sequelize.define(
  "category",
  {
    categoryId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    ...commonModelOption,
  }
);
CategoryModel.hasMany(BudgetModel, { foreignKey: "categoryId" });
BudgetModel.belongsTo(CategoryModel, { foreignKey: "categoryId" });

export default CategoryModel;
