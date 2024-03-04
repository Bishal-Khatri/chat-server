import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'name' | 'email' | 'password' | 'phone' | 'profile_image'>;
const PROTECTED_ATTRIBUTES = ['password'];

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public profile_image: string;
  public name: string;
  public email: string;
  public phone: string;
  public password: string;
  public sign_in_method: number;
  public google_id: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  toJSON() {
    // hide protected fields
    const attributes = Object.assign({}, this.get());
    for (const a of PROTECTED_ATTRIBUTES) {
      delete attributes[a];
    }
    return attributes;
  }
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      profile_image: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      sign_in_method: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      google_id: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
