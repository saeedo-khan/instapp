"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.registerRoutes = void 0;
var auth_route_1 = __importDefault(require("../routes/auth.route"));
var comment_route_1 = __importDefault(require("../routes/comment.route"));
var post_route_1 = __importDefault(require("../routes/post.route"));
var user_route_1 = __importDefault(require("../routes/user.route"));
var search_route_1 = __importDefault(require("../routes/search.route"));
var registerRoutes = function (app) {
    app.use("/api/auth", auth_route_1["default"]);
    app.use("/api/comments", comment_route_1["default"]);
    app.use("/api/posts", post_route_1["default"]);
    app.use("/api/users", user_route_1["default"]);
    app.use("/api/search", search_route_1["default"]);
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map