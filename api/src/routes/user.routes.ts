import express from 'express';
import { getUserInfo, getUserWishList, updateUserInfo } from '../controllers/user.controllers';
import { authenticate } from '../middlewares/authenticate';
const router = express.Router();

router.get('/', authenticate, getUserInfo);
router.get('/:id/wishlist', authenticate, getUserWishList);
router.post('/:id/update', authenticate, updateUserInfo);

export default router;