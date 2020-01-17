const pool = require('../models/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

exports.makeAdmin = (req,res) => {
    const id = Number(req.params.user_id)
    if (req.admin) {
        const query = 'UPDATE USERS SET is_admin=$1, is_employee=$2 WHERE user_id=$3 RETURNING user_id, username, email, is_admin, is_employee';
        const value = [true,false,id];

        pool.query(query, value)
        .then(
            (result) => {
                if (result.rowCount === 0) {
                    return res.status(404).json({status:404, message:`User can\'t be fetched with this ID ${id}`})
                }
                return res.status(201).json({status:200, data:[result.rows]})
            }
        ).catch(
            (error) => {
                return res.status(500).json({status:500, message:`${error}`})
            }
        );
    } else {
        res.status(401).json({status:401, message: 'YOU ARE NOT AUTHORIZE TO USE THIS ROUTE'})
    }
}
exports.createEmployee = (req, res) => {
    try {
        if (req.admin) {
            const {
            first_name, last_name, username, email, gender, phonenumber,passcode} = req.body;
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(passcode, salt, (err, hash) => {
                const passwordHash = hash;
                const query = "INSERT INTO USERS(first_name, last_name, username, email, gender, phonenumber, is_admin, password,is_employee) VALUES($1,$2,$3,$4,$5,$6,$7,$8 ,$9)RETURNING user_id, first_name, last_name, email, phonenumber, is_admin,is_employee"
                const value = [first_name, last_name, username, email, gender, phonenumber, false, passwordHash,true];
                
                pool.query('SELECT * FROM USERS WHERE username=$1 OR email=$2', [username, email], (err, resCheck) => {
                if (err) {
                    return res.status(500).json({
                    status: 500,
                    error: 'An unexpected error occurred',
                    });
                }
                if (resCheck.rowCount > 0) {
                    return res.status(409).json({ status: 409, error: 'User has been registered already' });
                }
    
                pool.query(query, value, (error, result) => {
                    if (error || result.rowCount === 0) {
                    return res.status(400).json({ status: 400, error: `Unable to create user, ${error}` });
                    }
                    const {user_id: id} = result.rows[0];
                    const {is_admin:admin} = result.rows[0];
                    const {is_employee:employee} = result.rows[0]
                    console.log(result.rows[0]);
                    jwt.sign({
                    username, admin, id,employee
                    },
                    process.env.TOKEN_SECRET, { expiresIn: '7d' }, (err, token) => {
                        res.status(201).json({
                        status: 201,
                        data: [{
                            token,
                            user: result.rows[0],
                            id 
                        }]
                        });
                    });
                });
                });
            });
            });
        }
        else {
            return res.status(401).json({status:401,message:'YOU ARE NOT AUTHORIZE TO USE THIS ROUTE'})
        }
      } catch (error) {
        return res.status(500).json({ status: 500, error: `Something unexpected just happened. Try again, ${error}` });
      }
    }

    exports.editEmployee = (req, res) => {
        const {first_name, last_name, username, email, gender, phonenumber} = req.body;
        if (req.admin){
            const {user_id} = req.params
            const query = 'UPDATE USERS SET first_name=$1, last_name=$2, username=$3, email=$4, gender=$5, phonenumber=$6, where user_id=$7 returning first_name, last_name, username, email, gender, phonenumber, is_admin';
            const value = [first_name, last_name, username, email, gender, phonenumber,user_id];
            client.query(query, value)
            .then(
                (result) => {
                    if (result.rowCount === 0) {
                        return res.status(404).json({status: 404, message: 'Record wasn\'t able to be fetched with ID'})
                    }
                    else {
                        return res.status(201).json({status: 201, message: 'Record updated', user: result.rows})
                    }
                })
            .catch(
                (error) => {
                    res.status(500).json({status: 500, message: 'Something Unexpected Happen'})
                });
        }
        else {
            return res.status(400).json({status: 400, message: 'YOU ARE NOT AUTHORIZE TO USE THIS ROUTE'});
        }
    }