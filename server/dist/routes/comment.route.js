"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var createComment_1 = require("../controllers/comments/createComment");
var deleteComment_1 = require("../controllers/comments/deleteComment");
var fetchComment_1 = require("../controllers/comments/fetchComment");
var router = express_1["default"].Router();
router.post("/:postId", createComment_1.createComment);
router.get("/:postId", fetchComment_1.fetchComments);
router["delete"]("/:commentId", deleteComment_1.deleteComment);
exports["default"] = router;
//# sourceMappingURL=comment.route.js.map