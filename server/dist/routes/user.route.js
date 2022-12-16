"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var addRemoveFollow_1 = require("../controllers/users/addRemoveFollow");
var changePassword_1 = require("../controllers/users/changePassword");
var deleteUser_1 = require("../controllers/users/deleteUser");
var fetchAllUsers_1 = require("../controllers/users/fetchAllUsers");
var fetchFollowing_1 = require("../controllers/users/fetchFollowing");
var fetchUserDetails_1 = require("../controllers/users/fetchUserDetails");
var fetchUserPosts_1 = require("../controllers/users/fetchUserPosts");
var suggestUsers_1 = require("../controllers/users/suggestUsers");
var updateUserDetails_1 = require("../controllers/users/updateUserDetails");
var uploadProfilePic_1 = require("../controllers/users/uploadProfilePic");
var router = express_1["default"].Router();
router.get("/:name/posts", fetchUserPosts_1.fetchUserPosts);
router.get("/:userId/all_following", fetchFollowing_1.fetchFollowings);
router.get("/:name", fetchUserDetails_1.fetchUserDetails);
router.get("/suggest_users/:userId", suggestUsers_1.suggestUsers);
router.get("/", fetchAllUsers_1.fetchAllUsers);
router.patch("/details", updateUserDetails_1.updateUserDetails);
router.patch("/changePassword", changePassword_1.changePassword);
router.patch("/upload_profile_pic", uploadProfilePic_1.uploadProfilePic);
router.patch("/:followerId/add_remove_follow", addRemoveFollow_1.addRemoveFollow);
router["delete"]("/:userId", deleteUser_1.deleteUser);
exports["default"] = router;
//# sourceMappingURL=user.route.js.map