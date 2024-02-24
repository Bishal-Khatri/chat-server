import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ChatParticipant } from '@interfaces/chat_participant.interface';

export type ChatParticipantCreationAttributes = Optional<ChatParticipant, 'id' | 'chat_id' | 'user_id'>;

export class ChatParticipantModel extends Model<ChatParticipant, ChatParticipantCreationAttributes> implements ChatParticipant {
  public id: number;
  public chat_id: number;
  public user_id: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ChatParticipantModel {
  ChatParticipantModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      chat_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'chat_participants',
      sequelize,
    },
  );

  return ChatParticipantModel;
}
