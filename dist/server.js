"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = require("./app");
const _authroute = require("./routes/auth.route");
const _usersroute = require("./routes/users.route");
const _chatroute = require("./routes/chat.route");
const _validateEnv = require("./utils/validateEnv");
(0, _validateEnv.ValidateEnv)();
const app = new _app.App([
    new _authroute.AuthRoute(),
    new _usersroute.UserRoute(),
    new _chatroute.ChatRoute()
]);
app.listen();

//# sourceMappingURL=server.js.map