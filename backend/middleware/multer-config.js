const multer = require('multer');
const MIMES_TYPE = {
    'image/jpg':'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
    
};
const storage = multer.diskStorage({
    destination: (req, file,callback) => {
    callback(null, 'GIFS');
    },
    filename: (req,file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIMES_TYPE[file.mimetype];
        const newName =  name + Date.now() + '.' + extension
        callback(null,newName );
        
        
    }
// const start = Date.now();
//  const stop = Date.now();
//  const elapsed = stop - start
//  console.log(start,stop, elapsed)
//  console.log(elapsed/1000)
});



module.exports = multer({storage:storage}).single('image')