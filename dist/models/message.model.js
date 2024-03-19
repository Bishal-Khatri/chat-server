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
    MessageModel: function() {
        return MessageModel;
    },
    default: function() {
        return _default;
    }
});
const _sequelize = require("sequelize");
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
let MessageModel = class MessageModel extends _sequelize.Model {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "inbox_hash", void 0);
        _define_property(this, "sender_id", void 0);
        _define_property(this, "message", void 0);
        _define_property(this, "createdAt", void 0);
        _define_property(this, "updatedAt", void 0);
    }
};
function _default(sequelize) {
    MessageModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: _sequelize.DataTypes.INTEGER
        },
        inbox_hash: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING
        },
        sender_id: {
            allowNull: false,
            type: _sequelize.DataTypes.INTEGER
        },
        message: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(255)
        }
    }, {
        tableName: 'messages',
        sequelize
    });
    return MessageModel;
}

//# sourceMappingURL=message.model.js.map