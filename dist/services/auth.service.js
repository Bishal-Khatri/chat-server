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
    AuthService: function() {
        return AuthService;
    },
    createToken: function() {
        return createToken;
    }
});
const _bcrypt = require("bcrypt");
const _typedi = require("typedi");
const _config = require("../config");
const _database = require("../database");
const _httpException = require("../exceptions/httpException");
const _jsonwebtoken = _interop_require_default(require("jsonwebtoken"));
const _constants = require("../constants");
const _usermodel = require("../models/user.model");
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const createToken = (user)=>{
    const dataStoredInToken = {
        id: user.id
    };
    const expiresIn = 60 * 60;
    const token = _jsonwebtoken.default.sign(dataStoredInToken, _config.SECRET_KEY, {
        expiresIn: expiresIn
    });
    return {
        expiresIn,
        token: token
    };
};
let AuthService = class AuthService {
    async signup(userData) {
        const findUser = await _database.DB.Users.findOne({
            where: {
                email: userData.email
            }
        });
        if (findUser) {
            throw new _httpException.HttpException(409, `This email ${userData.email} already exists`);
        }
        const hashedPassword = await (0, _bcrypt.hash)(userData.password, 10);
        const createUserData = await _database.DB.Users.create(_object_spread_props(_object_spread({}, userData), {
            password: hashedPassword,
            sign_in_method: _constants.SignInMethod.EMAIL
        }));
        return createUserData;
    }
    async login(userData) {
        const findUser = await _database.DB.Users.findOne({
            where: {
                email: userData.email
            }
        });
        if (!findUser) {
            throw new _httpException.HttpException(409, `This email was not found`);
        }
        if (findUser.sign_in_method !== _constants.SignInMethod.EMAIL) {
            throw new _httpException.HttpException(409, `This email was not registered via email and password.`);
        }
        const isPasswordMatching = await (0, _bcrypt.compare)(userData.password, findUser.password);
        if (!isPasswordMatching) {
            throw new _httpException.HttpException(409, 'Password not matching');
        }
        const tokenData = createToken(findUser);
        return {
            tokenData,
            findUser
        };
    }
    async googleLogin(userData) {
        const { sub, name, picture, email } = userData;
        const createUserData = {
            email: email,
            name: name,
            google_id: sub,
            profile_image: picture,
            sign_in_method: _constants.SignInMethod.GOOGLE
        };
        let user = await _usermodel.UserModel.findOne({
            where: {
                email: createUserData.email
            }
        });
        if (!user) {
            user = await _usermodel.UserModel.create(_object_spread({}, createUserData));
        }
        const findUser = await _usermodel.UserModel.findOne({
            where: {
                email: createUserData.email
            }
        });
        if (!findUser) {
            throw new _httpException.HttpException(409, `This email ${userData.email} was not found`);
        }
        const tokenData = createToken(findUser);
        return {
            tokenData,
            findUser
        };
    }
    async logout(userData) {
        const findUser = await _database.DB.Users.findOne({
            where: {
                email: userData.email
            }
        });
        if (!findUser) throw new _httpException.HttpException(409, "User doesn't exist");
        return findUser;
    }
};
AuthService = _ts_decorate([
    (0, _typedi.Service)()
], AuthService);

//# sourceMappingURL=auth.service.js.map