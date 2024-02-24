import { Sequelize, DataTypes, Model, Optional, BelongsTo } from 'sequelize';
import { Chat } from '@/interfaces/chat.interface';
import { UserModel } from './user.model';
import { MessageModel } from './message.model';

export type ChatCreationAttributes = Optional<Chat, 'id' | 'name' | 'is_group' | 'last_message_id' | 'admin_id' | 'receiver_id'>;

export class ChatModel extends Model<Chat, ChatCreationAttributes> implements Chat {
  public id: number;
  public name: string;
  public is_group: boolean;
  public last_message_id?: number;
  public admin_id: number;
  public receiver_id: number;

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
      last_message_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      admin_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      receiver_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
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

  // ChatModel.hasMany(MessageModel, {
  //   foreignKey: 'chat_id',
  //   as: 'messages',
  // });
  return ChatModel;
}
