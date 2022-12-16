"use strict";
exports.__esModule = true;
var express_1 = require("express");
var findSearchResult_1 = require("../controllers/search/findSearchResult");
var router = (0, express_1.Router)();
router.get("/", findSearchResult_1.findSearchResult);
exports["default"] = router;
//# sourceMappingURL=search.route.js.map