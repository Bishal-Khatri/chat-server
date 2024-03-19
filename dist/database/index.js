"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DB", {
    enumerable: true,
    get: function() {
        return DB;
    }
});
const _sequelize = _interop_require_default(require("sequelize"));
const _config = require("../config");
const _usermodel = _interop_require_default(require("../models/user.model"));
const _chatmodel = _interop_require_default(require("../models/chat.model"));
const _messagemodel = _interop_require_default(require("../models/message.model"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const sequelize = new _sequelize.default.Sequelize(_config.DB_DATABASE, _config.DB_USER, _config.DB_PASSWORD, {
    dialect: 'mysql',
    host: _config.DB_HOST,
    port: _config.DB_PORT,
    timezone: '+09:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: true
    },
    pool: {
        min: 0,
        max: 5
    },
    logQueryParameters: _config.NODE_ENV === 'development',
    logging: (query, time)=>{},
    benchmark: true
});
sequelize.authenticate();
const DB = {
    Users: (0, _usermodel.default)(sequelize),
    Chats: (0, _chatmodel.default)(sequelize),
    Messages: (0, _messagemodel.default)(sequelize),
    sequelize,
    Sequelize: _sequelize.default
};

//# sourceMappingURL=index.js.map