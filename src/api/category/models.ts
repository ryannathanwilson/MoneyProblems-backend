import { DataTypes, UUIDV4 } from "sequelize";
import BudgetModel from "../budget/models";
import { sequelize, commonModelOption } from "../sequelize";
import TransactionModel from "../transaction/models";

const CategoryModel = sequelize.define(
  "category",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    ...commonModelOption,
  }
);
CategoryModel.hasMany(BudgetModel, { foreignKey: "categoryId" });
BudgetModel.belongsTo(CategoryModel, { foreignKey: "categoryId" });

CategoryModel.hasMany(TransactionModel, { foreignKey: "categoryId" });
TransactionModel.belongsTo(BudgetModel, { foreignKey: "categoryId" });

export default CategoryModel;
