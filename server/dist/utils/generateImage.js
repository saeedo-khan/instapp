"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generateRandomImage = void 0;
var crypto_1 = __importDefault(require("crypto"));
var randomHash = function (str) {
    return crypto_1["default"].createHash("md5").update(str).digest("hex");
};
var generateRandomImage = function (_a) {
    var str = _a.str, _b = _a.type, type = _b === void 0 ? "identicon" : _b, _c = _a.size, size = _c === void 0 ? 200 : _c;
    var md5Hash = randomHash(str);
    return "https:/www.gravatar.com/avatar/".concat(md5Hash, "?d=").concat(type, "&s=").concat(size);
};
exports.generateRandomImage = generateRandomImage;
//# sourceMappingURL=generateImage.js.map