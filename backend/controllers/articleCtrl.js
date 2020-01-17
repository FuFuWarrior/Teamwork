const pool = require('../models/database');

exports.createCommentOnArticle = (req,res) => {
  if (req.employee) {
    const {reply} = req.body
    const {article_id} = req.params
    const query = 'UPDATE ARTICLES SET reply=$1 WHERE article_id=$2';
    const value = [reply,article_id];
    pool.query('SELECT * FROM ARTICLES WHERE reply=$1', [comment])
    .then(
      (result) => {
        if (result.rowCount > 0) {
          return res.status(404).json({status:404, message: 'Comment does exist'})
        }
      })
    .catch((error) => {
      res.status(500).json({status: 500, message:"Something Unexpected Happen" })
    });
    pool.query(query, value)
    .then(
      (result) => {
        res.status(201).json({status:201, message:'Comment successfully placed'})
      })
    .catch(
      (error) => {
        res.status(500).json({status:404, message: `Something Uexpected Happen ${error}`})
      })
  }
}

exports.createArticle = (req, res) => {
  const {article} = req.body
  if (req.employee) {  
    const query = 'INSERT INTO ARTICLES (article) VALUES($1) RETURNING*';
    const value = [article];

    pool.query('SELECT * FROM ARTICLES WHERE article = $1', [article])
    .then((resultCheck) => {
      if (resultCheck.rowCount > 0) {
        return res.status(404).json({status:404, message: `Article already exist`});
      }
      pool.query(query,value)
      .then( (result) => {
       return res.status(201).json({status:201, data: [result.rows[0]]})
      })
    }).catch( error => res.status(500).json({status:500, message:`Soemthing Happened Unexpectedly ${error}`}))
  }else {
    return res.status(404).json({status:404, message: 'YOU ARE NOT ALLOW TO USE THIS ROUTE'})
  }
}
/*exports.createArticle = (req, res) => {
  const {article} = req.body;

    if (1===1) {
        const query = 'INSERT INTO article (article) VALUES($1) RETURNING*';
        const value = [article];
        client.query('SELECT * FROM article WHERE article=$1', [article])
        .then((resultCheck) => {
          // checks for record in article database
          if (resultCheck.rowCount > 0) {
          // if record is in table
          return res.status(401).json({ status: 401, error: `Article Already exist ${err}`});
          })
        
        client.query(query, value)
          .then( (results) => {
            // successful record placement
            res.status(201).json({
              status: 201,
              data: [{article: results.rows[0].article}]})
            }).catch(err => res.status(500).json({status:500,error:error}))
          // also chain promises together
          
            /*.catch((error) => {
              // this is a database error which occurs when you waant to insert a record
              res.status(400).json({ status: 400, error: `Unable to post article ${error}` });
            });*/
          
          /*else{
            return res.status(400).json({status: 400, message: 'YOu are not Authorised to use this route'})
          }*/
        

exports.getOneArticle = (req,res) => {
      const article_id = Number(req.params.article_id);
      const query = `SELECT * FROM ARTICLES WHERE article_id=${article_id}`;
      pool.query(query).then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({status: 404, message: 'Record coudn\'t be fetched' })
        }
        else {
          return res.status(200).json({status: 200, data: [{article: result.rows[0]}]})
        }
      }).catch((error) => { res.status(500).json({status: 500, message: `Something Unexpected Happen${error}`})});
    }

exports.getAllArticle = (req, res) => {
    const query = 'SELECT * FROM ARTICLES ORDER BY CREATED_ON DESC ';
   pool.query(query)
    .then(
      (results) => {
        if (results.rowCount === 0) {
          return res.status(404).json({ status: 404, error: 'No rows in table'});
        }
        else {
          return res.status(200).json({status:200, data: {article:results.rows}});
        }
      }
      ).catch((error) =>  {
        res.status(500).json({error: `Something Unexpected happened: ${error}`});
        });
      }

exports.editarticle = (req,res) => {
        const {article} = req.body;
        if (req.employee) {
          const article_id = Number(req.params.article_id)
          //const userid = Number(req.Params.user_id)
          const query = 'UPDATE ARTICLES SET article=$1 where article_id=$2 RETURNING*';
          const value = [article,article_id];
          pool.query(query,value)
          .then((result) => {
            if (result.rowCount === 0) {
              return res.status(404).json({status:404,message: `Message can't be fetched with this ${article_id}`})
            }
            res.status(201).json({status:201, data:[result.rows[0]]});
          }).catch(error => res.status(500).json({status:500, message: error}))
        } else {
          res.status(401).json({status: 401, message: 'YOU ARE NOT AUTHORIZED TO USE THIS ROUTE'})
        }
       }  

/*exports.editArticle = (req,res) => {
  const {article} = req.body
  if (req.employee) {
    const {articleid} = Number(req.params);
    const query = 'update from article set article=$1 where articleId=$2';
    const value = [article, articleid] 
    client.query(query,value)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(400).json({status: 400, message: 'Record doesn\'t exist with this id'});
      }
      else {
        return res.status(200).json({status: 200, data: [{id: result.rows[0].articleId, article: result.row[0].article}]})
      }
    })
    .catch((error) => {
      res.status(500).json({status: 500, message: `Something unexpected happend ${error}`});
    });
  }
  else {
    return res.status(400).json({status: 400, message: 'You are not authorize to use this route'});
  }
}*/

exports.deleteAllArticle = (req,res) => {
  if (req.employee) {
    const query = 'DELETE FROM ARTICLES'
    pool.query(query)
    .then(
      (result) => {
        if (result.rowCount === 0){
          return res.status(404).json({
            status: 404,
            message: 'Record could not be found'
          });}
          else {
          return  res.status(200).json({
            status: '200',
            data: 'All rows deleted succesfully'
          });}
        
      }).catch((error) => {
        res.status(500).json({
          error: `Somethin happen ${error}`
        });
      });
  }
  else {
   return res.status(400).json({
      status: 400,
      error: 'You are not authorize to use this route'.toUpperCase()
    });
  } 
}


exports.deleteOneArticle = (req,res) => {
  if (req.employee) {
      const {article_id} = req.params; // works with const articleid  = Number(req.params.articleid)
      const query = 'DELETE FROM ARTICLES WHERE article_id=$1';
      const value = [article_id];
      pool.query(query, value)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(400).json({status: 400, status: 'Row could not be fetched with this id'});
        }
        else {
          return res.status(200).json({status: 200, message: 'Row succesfully deleted'});
        }
      }).catch((error) => {
      res.status(500).json({error: `Something unexpected happen ${error}`});
    });
  }
  else {
    return res.status(400).json({status: 400, message: 'You are not authorize to use this route'}); 
  }
}
