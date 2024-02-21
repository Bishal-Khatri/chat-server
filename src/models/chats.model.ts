import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Chat } from '@interfaces/chats.interface';

export type ChatCreationAttributes = Optional<Chat, 'id' | 'receiver_id' | 'message'>;

export class ChatModel extends Model<Chat, ChatCreationAttributes> implements Chat {
  public id: number;
  public receiver_id: number;
  public message: string;

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
      receiver_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'chats',
      sequelize,
    },
  );

  return ChatModel;
}
