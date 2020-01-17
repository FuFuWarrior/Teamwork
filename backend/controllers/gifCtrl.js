const pool= require('../models/database');
const cloudinary = require('../middleware/cloudinary');
const fs = require('fs');




exports.createGIf =  async (req, res,) => {

    const uploader = async (path) => await cloudinary.uploads(path, 'My Assets');

    if (req.method === 'POST') {
    const url = [];
    const {path} = req.file;
    const newPath = await uploader(path)
    url.push(newPath)
    fs.unlinkSync(path)
    
    if (req.employee) {
        const gif_link = url[0].url
        const query = 'INSERT INTO gifs (gif_link) VALUES($1) RETURNING*'
        const value = [gif_link]
        pool.query('SELECT * FROM gifs where gif_link = $1', [gif_link])
        .then((resultCheck) => {
            if (resultCheck > 0) {
                return res.status(400).json({status: 400, message: 'Record already exist'})
            }
        }
    ).catch((error) => {res.status(500).json({error : `Something Unexpected Happen ${error}`})});
    
    pool.query(query,value)
    .then((result) => {
       res.status(201).json({status:201, data: result.rows[0]}) 
    }).catch((error) => { res.status(500).json({status: 400, message: `Something Unexpected happen ${error}`})});
}
    else {
       return  res.status(400).json({status: 400, message: 'You are not authorize to use this routes'})
        }
    


    } else {
    res.status(405).json({
        err: `${req.method} method not allowed`
    })}
    
   
    
}

exports.getOneGif = (req, res) => {
    const {gif_id} = req.params
    const query =`SELECT * FROM gifs WHERE gifid = ${gif_id}`

    pool.query(query)
    .then( (result) => {
        if (result.rowCount === 0) {
            return res.status(404).json({status: 404, message: 'This id cannot be fetch'});
        }
        else {
            return res.status(200).json({status: 200, data: [result.rows]})
        }
    })
    .catch( error => {res.status(500).json({status:500, message: `Something Unexpected Happen ${error}`})});
}

exports.getAllGif = (req,res) => {
    const query = 'SELECT * FROM gifs'
    pool.query(query)
    .then((results) => { 
        if (results.rowCount === 0) {
            return res.status(404).json({status: 404, message: 'Record doesn\'t exist'});}
        else {
            return res.status(200).json({status: 200, message: results.rows})
        }
    })
    .catch((error) => {res.status(400).json({ status:400, message:`Something Unexpected Happen ${error}`})});
}

exports.updateGif = (req,res) => {
    const {gif_link} = req.body
    if (req.employee) {
        const gif_id = req.params.gif_id
        const query = 'UPDATE gifs WHERE gif_link=$1 where gif_id=$2 returning *';
        const value = [gif_link, gif_id] 
        pool.query(query, value)
        .then((result) => {
            if (result.rowCount === 0) {
                return res.status().json({status: 404, message: 'Record doesn\'t exist'})
            }
            else {
                return res.status(201).json({status: 201, data: result.rows});
            }
        }).catch((error) => {
            res.status(500).json({status: 500, message: `Something Unexpected Happen ${error}`})
        });
    }
    else 
    {
            return res.status(400).json({status: 400, message: 'You are not authourize to use this route'})
    }
    
}

exports.deleteOneGIf = (req,res) => {
    if (req.employee) {
        const {gif_id} = req.params;
        const query = 'DELETE * FROM gifs WHERE gif_id=$1';
        const value = [gif_id]
        pool.query(query, value)
        .then((result) => {
            if (result.rowCount === 0) {
                return res.status(404).json({status: 404, message: 'Record doesn\'t exist'});
            }
            else {
                return res.status(200).json({status: 200, message: 'Row deleted'});
            }
        }).catch((error) => {res.status(500).json({status: 500, error: `Something Unexpected happen ${error}`});});
    }
    else {
        return res.status(400).json({status: 400, error: 'You are not authorize to use this route'});
    }

}

exports.deleteAllGif = (req,res) => {
     if (req.employee) {
         const query = 'DELETE FROM gifs WHERE  ';
         pool.query(query)
         .then((result) => {
            if (result.rowCount === 0) {
                return res.status(404).json({status: 404, message: 'No rows found'});
            }
            else {
                return res.status(200).json({status: 200, message: 'rows deleted successfully' })
            }
            
         }).catch((e) => {res.status(500).json({status:500, message:`Unexpected Error${e}`})}); 
     }
     else {
         return res.status(400).json({status: 400, message: 'You are not authorized to use this route'})
     }
}

/*exports.createcommentOnGif = (req, res) => {
    const {comment} = req.body
    if (req.employee) {
        const query = 'insert into comment(comments) values($1) returning*';
        const value = [comment];
        client.query(`select * from comment where comment= ${comment}`)
        .then(
            (result) => {
                if (result.rowCount > 0) {
                    return res.status(404).json({status: 404, message: 'Record already exist'});
                }
                client.query(query,value)
                .then(
                    (result) => {
                        return res.status(201).json(data[{status:'201', comment: result.rows}])
                    });
            }
        ).catch((error) => {res.status(500).json({status: 500, message:`Unexpected error ${error}`}) });
        
    }
    else {
        return res.status(400).json({status: 500, message: 'You are not authorized to use this route'})
    }
}*/

exports.createcommentOnGif = (req, res) => {
    const {reply} = req.body
    const {gif_id} = req.params
    if (req.employee) {
        const query = 'UPDATE gif SET comment=$1 WHERE gifid=$2 returning*';
        const value = [reply,gif_id];
        // console.log(comment);
        // console.log(gifid);
        pool.query('sSELECT * FROM gifs WHERE reply=$1',[reply])
        .then(
            (result) => {
                if (result.rowCount > 0) {
                    return res.status(404).json({status: 404, message: 'Record already exist'});
                }
                client.query(query,value)
                .then(
                    (result) => {
                        return res.status(201).json(data[{status:'201', comment: result.rows}])
                    }).catch((e) => {
                        res.status(500).json({status:500, message: `Something unexpected happened ${e}`})
                    });
            }
        ).catch((error) => {res.status(500).json({status: 500, message:`Unexpected error ${error}`}) });
        
    }
    else {
        return res.status(400).json({status: 500, message: 'You are not authorized to use this route'})
    }
}