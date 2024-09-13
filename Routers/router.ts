import { Router } from 'express';
import * as authController from '../Controllers/authController'; 
// import { verifyToken } from '../Middlewares/userAuth'; 
import express from 'express';
import * as articleController from '../Controllers/articleController'
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';

const router: Router = express.Router();

// Define routes with type safety
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/reset-password',jwtMiddleware, authController.resetPassword);
router.post('/update-profile',jwtMiddleware, authController.updateProfile);

router.post('/add-article', articleController.addArticle);
router.get('/articles', articleController.getArticles);
router.delete('/articles/:id', articleController.deleteArticle);
router.get('/all-articles', articleController.getAllArticles);
router.post('/like-article/:id', articleController.likeArticle);
router.post('/dislike-article/:id', articleController.dislikeArticle);
router.post('/block-article/:id', articleController.blockArticle);
router.get('/blocked-articles',articleController.blockedArticle)
router.post('/unblock-article/:id', articleController.unblockArticle);






export default router; // Use export
