"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const authenticate_1 = require("../middlewares/authenticate");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticate, user_controllers_1.getUserInfo);
router.get('/:id/cart', authenticate_1.authenticate, user_controllers_1.getUserCartList);
router.post('/:id/update', authenticate_1.authenticate, user_controllers_1.updateUserInfo);
router.get('/:id/wishlist', authenticate_1.authenticate, user_controllers_1.getUserWishList);
exports.default = router;
