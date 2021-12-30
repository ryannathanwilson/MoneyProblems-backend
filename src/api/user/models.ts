import { DataTypes, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../sequelize";

const UserModel = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "rnw",
    hooks: {
      beforeCreate: async (user) => {
        const salt = bcrypt.genSaltSync();
        // eslint-disable-next-line
        user.get().password = bcrypt.hashSync(user.get().password, salt);
      },
    },
  }
);

export default UserModel;
