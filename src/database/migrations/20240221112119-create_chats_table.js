'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_group: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      last_message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      inbox_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  },
};
