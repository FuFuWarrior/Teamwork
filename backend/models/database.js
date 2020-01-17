const {Pool} = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const pool = new Pool({
    user : process.env.PG_USER,
    password : process.env.PG_PW,
    host : process.env.PG_HOST,
    port :  process.env.PG_PORT,
    database : process.env.PG_DATABASE
});
//const query = "insert into users(first_name,last_name,username,email,gender,phonenumber,is_admin,passcode,is_employee) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id, first_name, last_name, email, phonenumber,is_admin";
pool.on('connect',() => console.log('working'))


// pool.query("select * from users").then((result) => {
//     console.table(result.rows);
// }).catch(e => console.log);

//.then(() => pool.query('SELECT * FROM USERS')).then((result) => console.table(result.rows))

// () => {
//     bcrypt.hash('kofo',10)
//     .then((hash) => {
//         const passwordHash = hash
//         pool.query(query,['kofo','lizzy','queenb','kofo@test.com','female','849',true,passwordHash,false] )
//     }).catch(e => console.log)

//const value = ['kofo','lizzy','queenb','female','849',true, passwordHash];



//.finally(() => client.end().then(()=>{console.log('connection ended')}));

module.exports = pool