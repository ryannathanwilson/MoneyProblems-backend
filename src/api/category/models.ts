import { DataTypes, UUIDV4 } from "sequelize";
import BudgetModel from "../budget/models";
import { sequelize, commonModelOption } from "../sequelize";
import TransactionModel from "../transaction/models";

const CategoryModel = sequelize.define(
  "category",
  {
    categoryId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
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

CategoryModel.hasMany(TransactionModel, { foreignKey: "categoryId" });
TransactionModel.belongsTo(CategoryModel, { foreignKey: "categoryId" });

export default CategoryModel;
