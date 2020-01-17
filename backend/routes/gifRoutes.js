const express = require('express');
const gifRouter = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 
const gifCtrl = require('../controllers/gifCtrl');


gifRouter.post('/gifs/upload', auth.verifyUser, multer,  gifCtrl.createGIf); 
gifRouter.delete('/gifs/', auth.verifyUser, gifCtrl.deleteAllGif);
gifRouter.get('/gifs/', auth.verifyUser, gifCtrl.getAllGif);
gifRouter.get('/gifs/:gifid', auth.verifyUser, gifCtrl.getOneGif);
gifRouter.patch('/gifs/:gifid', auth.verifyUser, gifCtrl.updateGif);
gifRouter.delete('/gifs/:gifid', auth.verifyUser, gifCtrl.deleteOneGIf);
gifRouter.patch('/gifs/:gifid/comments', auth.verifyUser, gifCtrl.createcommentOnGif);


module.exports = gifRouter;
