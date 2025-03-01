import express from 'express';
import { authenticate } from '../middlewares/authenticate';
import { addNewProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controllers';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/addproduct', authenticate, addNewProduct);
router.post('/:id/update', authenticate, updateProduct);
router.delete('/:id/delete', authenticate, deleteProduct);

export default router;