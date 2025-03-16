"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middlewares/authenticate");
const product_controllers_1 = require("../controllers/product.controllers");
const router = express_1.default.Router();
router.get('/', product_controllers_1.getAllProducts);
router.get('/:id', product_controllers_1.getSingleProduct);
router.post('/addproduct', authenticate_1.authenticate, product_controllers_1.addNewProduct);
router.post('/:id/update', authenticate_1.authenticate, product_controllers_1.updateProduct);
router.delete('/:id/delete', authenticate_1.authenticate, product_controllers_1.deleteProduct);
router.post('/:id/addwishlist', authenticate_1.authenticate, product_controllers_1.addProductToWishlist);
router.post('/:id/removewishlist', authenticate_1.authenticate, product_controllers_1.removeProductToWishlist);
router.post('/:id/addcart', authenticate_1.authenticate, product_controllers_1.addProductToCart);
router.post('/:id/removecart', authenticate_1.authenticate, product_controllers_1.removeProductToCart);
exports.default = router;
