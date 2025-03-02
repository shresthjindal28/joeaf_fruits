import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { addNewProduct, addProductToWishlist, deleteProduct, getAllProducts, removeProductToWishlist, updateProduct } from '../controllers/product.controllers';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/addproduct', authenticate, addNewProduct);
router.post('/:id/update', authenticate, updateProduct);
router.delete('/:id/delete', authenticate, deleteProduct);
router.post('/:id/addwishlist', authenticate, addProductToWishlist);
router.post('/:id/removewishlist', authenticate, removeProductToWishlist);

export default router;