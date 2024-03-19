"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ChatModel: function() {
        return ChatModel;
    },
    default: function() {
        return _default;
    }
});
const _sequelize = require("sequelize");
const _usermodel = require("./user.model");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
let ChatModel = class ChatModel extends _sequelize.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "name", void 0);
        _define_property(this, "is_group", void 0);
        _define_property(this, "last_message", void 0);
        _define_property(this, "admin_id", void 0);
        _define_property(this, "receiver_id", void 0);
        _define_property(this, "inbox_hash", void 0);
        _define_property(this, "createdAt", void 0);
        _define_property(this, "updatedAt", void 0);
    }
};
function _default(sequelize) {
    ChatModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: _sequelize.DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING
        },
        is_group: {
            allowNull: false,
            type: _sequelize.DataTypes.BOOLEAN
        },
        last_message: {
            allowNull: true,
            type: _sequelize.DataTypes.STRING
        },
        admin_id: {
            allowNull: false,
            type: _sequelize.DataTypes.INTEGER
        },
        receiver_id: {
            allowNull: false,
            type: _sequelize.DataTypes.INTEGER
        },
        inbox_hash: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING
        }
    }, {
        tableName: 'chats',
        sequelize
    });
    ChatModel.belongsTo(_usermodel.UserModel, {
        foreignKey: 'receiver_id',
        as: 'receiver'
    });
    ChatModel.belongsTo(_usermodel.UserModel, {
        foreignKey: 'admin_id',
        as: 'owner'
    });
    return ChatModel;
}

//# sourceMappingURL=chat.model.js.map