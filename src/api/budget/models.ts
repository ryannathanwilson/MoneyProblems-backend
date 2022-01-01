import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize, commonModelOption } from "../sequelize";

const BudgetModel = sequelize.define(
  "budget",
  {
    budgetId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    ...commonModelOption,
  }
);

export default BudgetModel;
