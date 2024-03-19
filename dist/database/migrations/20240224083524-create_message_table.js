'use strict';
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            inbox_hash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sender_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            message: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },
    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('messages');
    }
};

//# sourceMappingURL=20240224083524-create_message_table.js.map