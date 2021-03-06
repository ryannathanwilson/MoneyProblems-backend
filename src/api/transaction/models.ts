import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize, commonModelOption } from "../sequelize";

const TransactionModel = sequelize.define(
  "transaction",
  {
    transactionId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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

export default TransactionModel;
