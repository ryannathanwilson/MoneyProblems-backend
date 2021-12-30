import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize, commonModelOption } from "../sequelize";

const BudgetModel = sequelize.define(
  "budget",
  {
    budgetId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    ...commonModelOption,
  }
);

export default BudgetModel;
