"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthRoute", {
    enumerable: true,
    get: function() {
        return AuthRoute;
    }
});
const _express = require("express");
const _authcontroller = require("../controllers/auth.controller");
const _usersdto = require("../dtos/users.dto");
const _authmiddleware = require("../middlewares/auth.middleware");
const _validationmiddleware = require("../middlewares/validation.middleware");
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
let AuthRoute = class AuthRoute {
    initializeRoutes() {
        this.router.post('/signup', (0, _validationmiddleware.ValidationMiddleware)(_usersdto.CreateUserDto), this.auth.signUp);
        this.router.post('/login', (0, _validationmiddleware.ValidationMiddleware)(_usersdto.LoginUserDto), this.auth.logIn);
        this.router.post('/login/google', this.auth.googleLogIn);
        this.router.get('/user', _authmiddleware.AuthMiddleware, this.auth.authUser);
        this.router.post('/logout', _authmiddleware.AuthMiddleware, this.auth.logOut);
    }
    constructor(){
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "auth", new _authcontroller.AuthController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=auth.route.js.map