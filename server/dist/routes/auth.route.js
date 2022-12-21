"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var checkAuth_1 = require("../controllers/auth/checkAuth");
var login_1 = require("../controllers/auth/login");
var logout_1 = require("../controllers/auth/logout");
var signup_1 = require("../controllers/auth/signup");
var router = express_1["default"].Router();
router.post('/login', login_1.login);
router.post('/signup', signup_1.signUp);
router.get('/logout', logout_1.logOut);
router.get("/checkAuth", checkAuth_1.checkAuth);
exports["default"] = router;
//# sourceMappingURL=auth.route.js.map