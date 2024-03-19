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
    UserModel: function() {
        return UserModel;
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
const PROTECTED_ATTRIBUTES = [
    'password'
];
let UserModel = class UserModel extends _sequelize.Model {
    toJSON() {
        const attributes = Object.assign({}, this.get());
        for (const a of PROTECTED_ATTRIBUTES){
            delete attributes[a];
        }
        return attributes;
    }
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "profile_image", void 0);
        _define_property(this, "name", void 0);
        _define_property(this, "email", void 0);
        _define_property(this, "phone", void 0);
        _define_property(this, "password", void 0);
        _define_property(this, "sign_in_method", void 0);
        _define_property(this, "google_id", void 0);
        _define_property(this, "createdAt", void 0);
        _define_property(this, "updatedAt", void 0);
    }
};
function _default(sequelize) {
    UserModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: _sequelize.DataTypes.INTEGER
        },
        profile_image: {
            allowNull: true,
            type: _sequelize.DataTypes.STRING(45)
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(45)
        },
        email: {
            allowNull: true,
            type: _sequelize.DataTypes.STRING(45)
        },
        phone: {
            allowNull: true,
            type: _sequelize.DataTypes.STRING(45)
        },
        password: {
            allowNull: true,
            type: _sequelize.DataTypes.STRING(255)
        },
        sign_in_method: {
            allowNull: false,
            type: _sequelize.DataTypes.INTEGER
        },
        google_id: {
            allowNull: true,
            type: _sequelize.DataTypes.TEXT
        }
    }, {
        tableName: 'users',
        sequelize
    });
    return UserModel;
}

//# sourceMappingURL=user.model.js.map