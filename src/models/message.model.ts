import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Message } from '@interfaces/message.interface';

export type MessageCreationAttributes = Optional<Message, 'id' | 'inbox_hash' | 'sender_id' | 'message'>;

export class MessageModel extends Model<Message, MessageCreationAttributes> implements Message {
  public id: number;
  public inbox_hash: string;
  public sender_id: number;
  public message: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof MessageModel {
  MessageModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      inbox_hash: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sender_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'messages',
      sequelize,
    },
  );

  return MessageModel;
}
