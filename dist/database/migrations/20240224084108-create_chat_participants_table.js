'use strict';
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('chat_participants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            chat_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'chats',
                    key: 'id'
                }
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    },
    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('chat_participants');
    }
};

//# sourceMappingURL=20240224084108-create_chat_participants_table.js.map