import { Sequelize, DataTypes, Model, Optional, BelongsTo } from 'sequelize';
import { Chat } from '@/interfaces/chat.interface';
import { UserModel } from './user.model';

export type ChatCreationAttributes = Optional<Chat, 'id' | 'name' | 'is_group' | 'last_message' | 'admin_id' | 'receiver_id' | 'inbox_hash'>;

export class ChatModel extends Model<Chat, ChatCreationAttributes> implements Chat {
  public id: number;
  public name: string;
  public is_group: boolean;
  public last_message?: string;
  public admin_id: number;
  public receiver_id: number;
  public inbox_hash: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ChatModel {
  ChatModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_group: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      last_message: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      admin_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      receiver_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      inbox_hash: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },

    {
      tableName: 'chats',
      sequelize,
    },
  );

  ChatModel.belongsTo(UserModel, {
    foreignKey: 'receiver_id',
    as: 'receiver',
  });

  ChatModel.belongsTo(UserModel, {
    foreignKey: 'admin_id',
    as: 'owner',
  });

  return ChatModel;
}
