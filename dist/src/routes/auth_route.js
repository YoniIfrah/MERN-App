"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const router = express_1.default.Router();
router.post('/register', auth_1.default.register);
router.post('/login', auth_1.default.login);
router.post('/logout', auth_1.default.logout);
module.exports = router;
//# sourceMappingURL=auth_route.js.map