const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/database');
 require('dotenv').config();



exports.login = (req, res, next) => {
      const { email, passcode } = req.body;
      const query = 'SELECT * FROM USERS WHERE email=$1';
      const value = [email];
      pool.query(query, value)
      .then((result) => {
          if (result.rowCount === 0) {
              return res.status(404).json({status:404, message:`This ${email} can\'t be found`})
          }
          //compares the hash password from the form and the hash password from the datebase
          bcrypt.compare(passcode, result.rows[0].passcode)
          .then((isMatch) => {
              if (isMatch){
            const {is_admin: admin}= result.rows[0];
            const {username} = result.rows[0];
            const {user_id: id} = result.rows[0];
            const {email} = result.rows[0];
            const {is_employee:employee} = result.rows[0];
            delete result.rows[0].passcode
            jwt.sign({ username, admin, id, email, employee},
                process.env.TOKEN_SECRET, { expiresIn: '7d' }, (err, token) => {
                  res.status(201).json({
                    status: 201,
                    data: [{
                      token: token, 
                      user: result.rows
                    }]
                  });
                });
            
            }
            else {
                return res.status(404).json({status:404, message:'Incorrect Password'})
            }
          })
      }).catch((error) => {
          res.status(500).json({status:500, message:`Something Unexpected happen ${error}`});
      });
     

}
exports.getAllEmployee = (req, res) => {
    const query = 'SELECT * FROM USERS';
    pool.query(query).then(
        (results) => {
            if (results.rowCount === 0) {
                return res.status(404).json({status: 400, message: 'Record not found'})
            }
            else{
                return res.status(200).json({status: 200, data: [{employee: results.rows}]})
            }
    }).catch((err) => {res.status(500).json({status: 500, message: `Something Unexpected Happen ${err}`})})
}

exports.getOneEmployee = (req, res) => {
    const user_id = Number(req.params.user_id)
    const query = `SELECT * FROM USERS user_id=${user_id}`
    pool.query(query)
    .then( (result) => {
        if (result.rowCount === 0) {
            return res.status(404).json({status: 404, message: `The record couldn\'t be fetched with this ID: ${user_id}`});
        }
        else {
            return res.status(200).json({status: 200, data: [result.rows[0]]});
        }
    })
    .catch( err => {res.status(500).json({status: 500, message: `Something Unexpected Happen ${err}`})});
}

/*exports.createEmployee = (req,res) => {
    if (req.admin) {
      const  {firstname, lastname, username, email, gender, phonenumber, isadmin} = req.body;
        const query = `insert into employee(firstname, lastname, username,email,gender,phonenumber,isadmin) value($1,$2,$3,$4,$5,$6,$7)`
        const value = [firstname, lastname, username, email, gender, phonenumber, isadmin];
        client.query('select * from employee where firstname, lastname, email, gender, phonenumber, isadmin = $1,$2,$3,$4,$5,$6,$7', value)
        .then((result) => {
            if (result.rowsCount > 0) {
                return res.status(404).json({status: 404, message: 'Record alresdy exist'});
            }
        }).catch(
            (error) => {
                 res.status(500).json({status: 500, message: `Something Unexpected Happen ${error}`})
            }
        );
        client.query(query, value)
        .then((result) => {
            res.status(200).json({status: 201, message: 'Record Created'})
        }
        ).catch((error) => {
            res.status(500).json({status: 500, message: `Something Unexpected happen ${error}`})
        }); 
    }
    else {
        return res.status(400).json({status: 500, message: 'You are not authorize to use this route'});
    }
}*/



exports.deleteOneEmployee = (req, res) => {
    if (req.admin) {
    const {user_id} = Number(req.params);
    const query = `DELETE FROM USERS WHERE user_id=${user_id}`;
    pool.query(query)
    .then(
        (result) => {
            if (result.rowCount === 0) {
                return res.status(404).json({status: 400, message: `Record doesn\'t exist with this ID: ${user_id}`});
            }
            else {
                return res.status(200).json({status: 200, message: 'One Record deleted succesfully'})
            }
        }).catch(
            (error) => {
                res.status(500).json({status: 500, message: `Something Unexpected happen ${error}`});
        });
    }
    else {
        return res.status(400).status({status: 400, message: 'YOU ARE AUTHORIZED TO USE THIS ROUTE'});
    }
}

exports.deleteALLEmployee = (req, res) => {
    if (req.admin) {
        const query = 'DELETE FROM USERS'
        pool.query(query)
        .then(
            (result) => {
                if (result.rowCount === 0) {
                    return res.status(404).json({status: 404, message: `Record soesn\'t exist with this ID ${user_id}`})
                }
                else {
                    return res.status(200).json({status:200, message:'ALL RECORDS DELETED FROM EMPLOYEE TABLE'})
                }
            })
            .catch(
                (error) => {
                    res.status(500).json({status: 500, message: `Something Unexpected Happen ${error}`});
                });
    }
}