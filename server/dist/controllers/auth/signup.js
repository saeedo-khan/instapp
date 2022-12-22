"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.signUp = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = require("../../utils/db");
var generateImage_1 = require("../../utils/generateImage");
var password_util_1 = require("../../utils/password.util");
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, gender, biography, emailExist, user, _b, _c, token, error_1;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 4, , 5]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, gender = _a.gender, biography = _a.biography;
                // Validate user input
                if (!(email && password && name)) {
                    res.status(400).send('All input is required');
                }
                return [4 /*yield*/, db_1.db.user.findUnique({
                        where: {
                            email: email
                        },
                        select: {
                            email: true
                        }
                    })];
            case 1:
                emailExist = _f.sent();
                if (emailExist) {
                    return [2 /*return*/, res.status(400).send('User Already Exist. Please Login')];
                }
                _c = (_b = db_1.db.user).create;
                _d = {};
                _e = {
                    name: name,
                    email: email
                };
                return [4 /*yield*/, Promise.resolve((0, password_util_1.hashPassword)(password))];
            case 2: return [4 /*yield*/, _c.apply(_b, [(_d.data = (_e.password = _f.sent(),
                        _e.profile_pic_url = (0, generateImage_1.generateRandomImage)({ str: email }),
                        _e.gender = gender,
                        _e.biography = biography,
                        _e),
                        _d)])];
            case 3:
                user = _f.sent();
                token = jsonwebtoken_1["default"].sign({ userId: user.id, email: email }, process.env.TOKEN_KEY);
                // save user token
                user.token = token;
                // return new user
                res.status(201).json({
                    type: 'success',
                    message: "Account created for ".concat(user.name),
                    data: {
                        user: user
                    }
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _f.sent();
                return [2 /*return*/, res.status(404).json({ message: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
//# sourceMappingURL=signup.js.map