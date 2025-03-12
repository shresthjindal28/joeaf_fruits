import express from 'express';
import { getUserCartList, getUserInfo, getUserWishList, updateUserInfo } from '../controllers/user.controllers';
import { authenticate } from '../middlewares/authenticate';
const router = express.Router();

router.get('/', authenticate, getUserInfo);
router.get('/:id/cart', authenticate, getUserCartList);
router.post('/:id/update', authenticate, updateUserInfo);
router.get('/:id/wishlist', authenticate, getUserWishList);

export default router;