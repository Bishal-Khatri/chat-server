"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _typedi = require("typedi");
const _authservice = require("../services/auth.service");
const _axios = _interop_require_default(require("axios"));
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let AuthController = class AuthController {
    constructor(){
        _define_property(this, "auth", _typedi.Container.get(_authservice.AuthService));
        _define_property(this, "signUp", async (req, res, next)=>{
            try {
                const userData = req.body;
                const signUpUserData = await this.auth.signup(userData);
                const { tokenData, findUser } = await this.auth.login(userData);
                res.status(200).json({
                    token: tokenData,
                    data: findUser,
                    message: 'login'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "logIn", async (req, res, next)=>{
            try {
                const userData = req.body;
                const { tokenData, findUser } = await this.auth.login(userData);
                res.status(200).json({
                    token: tokenData,
                    data: findUser,
                    message: 'login success'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "googleLogIn", async (req, res, next)=>{
            try {
                const code = req.body.code;
                const payload = {
                    code,
                    client_id: '198239904766-eijfbnkvcs5ni21o8ecncnt93feeklbv.apps.googleusercontent.com',
                    client_secret: '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',
                    redirect_uri: 'postmessage',
                    grant_type: 'authorization_code'
                };
                const response = await _axios.default.post('https://oauth2.googleapis.com/token', payload);
                const accessToken = response.data.access_token;
                const userResponse = await _axios.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const { tokenData, findUser } = await this.auth.googleLogin(userResponse.data);
                res.status(200).json({
                    token: tokenData,
                    data: findUser,
                    message: 'login'
                });
            } catch (error) {
                console.log(error.message);
            }
        });
        _define_property(this, "authUser", async (req, res, next)=>{
            try {
                const userData = req.user;
                res.status(200).json({
                    data: userData,
                    message: 'authUser'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "logOut", async (req, res, next)=>{
            try {
                const userData = req.user;
                const logOutUserData = await this.auth.logout(userData);
                res.status(200).json({
                    data: logOutUserData,
                    message: 'logout'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=auth.controller.js.map