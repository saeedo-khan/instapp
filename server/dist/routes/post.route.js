"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var addRemoveLike_1 = require("../controllers/posts/addRemoveLike");
var createPost_1 = require("../controllers/posts/createPost");
var deletePost_1 = require("../controllers/posts/deletePost");
var fetchMyPosts_1 = require("../controllers/posts/fetchMyPosts");
var fetchPostDetails_1 = require("../controllers/posts/fetchPostDetails");
var fetchPosts_1 = require("../controllers/posts/fetchPosts");
var tagUser_1 = require("../controllers/posts/tagUser");
var router = express_1["default"].Router();
router.get("/my_posts", fetchMyPosts_1.fetchMyPosts);
router.get("/all_posts", fetchPosts_1.fetchPosts);
router.get("/:userId", fetchPostDetails_1.fetchPostDetails);
router.post("/", createPost_1.createPost);
router["delete"]("/:postId", deletePost_1.deletePost);
router.post("/add_tag", tagUser_1.tagUser);
router.patch("/:postId/add_remove_like", addRemoveLike_1.addRemoveLike);
exports["default"] = router;
//# sourceMappingURL=post.route.js.map