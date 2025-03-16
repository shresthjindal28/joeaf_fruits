import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { addNewProduct, addProductToCart, addProductToWishlist, deleteProduct, getAllProducts, getSingleProduct, removeProductToCart, removeProductToWishlist, updateProduct } from '../controllers/product.controllers';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.post('/addproduct', authenticate, addNewProduct);
router.post('/:id/update', authenticate, updateProduct);
router.delete('/:id/delete', authenticate, deleteProduct);
router.post('/:id/addwishlist', authenticate, addProductToWishlist);
router.post('/:id/removewishlist', authenticate, removeProductToWishlist);
router.post('/:id/addcart', authenticate, addProductToCart);
router.post('/:id/removecart', authenticate, removeProductToCart);

export default router;