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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var db_1 = require("../../utils/db");
var _helper_1 = require("../users/_helper");
var fetchFriendsPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser_1, posts, postsData_1, _loop_1, posts_1, posts_1_1, e_1_1, error_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 15, , 16]);
                currentUser_1 = req.body.userId;
                return [4 /*yield*/, db_1.db.post.findMany({
                        where: {
                            author: {
                                following: {
                                    some: {
                                        id: currentUser_1
                                    }
                                }
                            }
                        },
                        orderBy: {
                            createdAt: "desc"
                        },
                        include: _helper_1.include
                    })];
            case 1:
                posts = _b.sent();
                postsData_1 = [];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, 9, 14]);
                _loop_1 = function () {
                    var post;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                post = posts_1_1.value;
                                return [4 /*yield*/, (0, _helper_1.hasLikePost)(currentUser_1, post.id)];
                            case 1:
                                _c.sent();
                                switch (post.audience) {
                                    case "FRIENDS":
                                        postsData_1.push(post);
                                        break;
                                    case "PUBLIC":
                                        postsData_1.push(post);
                                        break;
                                    case "SPECIFIC":
                                        post.specificAudienceFriends.forEach(function (u) {
                                            if (u.id === currentUser_1.id) {
                                                postsData_1.push(post);
                                            }
                                        });
                                        break;
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                posts_1 = __asyncValues(posts);
                _b.label = 3;
            case 3: return [4 /*yield*/, posts_1.next()];
            case 4:
                if (!(posts_1_1 = _b.sent(), !posts_1_1.done)) return [3 /*break*/, 7];
                return [5 /*yield**/, _loop_1()];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 3];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _b.trys.push([9, , 12, 13]);
                if (!(posts_1_1 && !posts_1_1.done && (_a = posts_1["return"]))) return [3 /*break*/, 11];
                return [4 /*yield*/, _a.call(posts_1)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/, res.status(200).json({
                    type: "success",
                    message: "fetch feed posts",
                    data: {
                        posts: postsData_1
                    }
                })];
            case 15:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(404).json({ message: error_1 })];
            case 16: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=fetchFriendPosts.js.map