const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/articleCtrl');
const auth = require('../middleware/auth');

router.get('/feed', auth.verifyUser, articleCtrl.getAllArticle);
router.post('/articles', auth.verifyUser, articleCtrl.createArticle);
router.patch('/articles/:articleid/comments', auth.verifyUser, articleCtrl.createCommentOnArticle);
router.get('/articles/:articleid', auth.verifyUser, articleCtrl.getOneArticle);
router.patch('/articles/:articleid', auth.verifyUser, articleCtrl.editarticle);
router.delete('/articles/:articleid', auth.verifyUser, articleCtrl.deleteOneArticle);
router.delete('/articles/', auth.verifyUser, articleCtrl.deleteAllArticle);

module.exports = router;
