const chai = require('chai'), 
chaiHttp = require('chai-http');
const app = require('../app');
require('dot-env').config();
//const expect = chai.expect
chai.should();
chai.use(chaiHttp);
let token;
let token1 = "YWxzZSwiaWQiOjcyLCJlbWFpbCI6ImtvZmtvQHRlc3QuY29tIiiZWw5ZUiORyWUsmI6T3ODU2MTk4MywiZXhwIjoxT5Y2zgQv5EhgCKLRqLTPwPUL5YsxyY6GhxuQs0pKiBaoEpoBfo";
describe('POST auth/login', function() {
    it('it should log in the user', ((done) => {
        const loginDetails ={
         "email": process.env.ADMIN_EMAIL,
         "password": process.env.ADMIN_PASSCODE
      }
        chai.request(app)//one can use the direct localhost of PORT 'http://localhost:PORT'
          .post('/api/v1/auth/login')
          //.set('Content-Type', 'application/json')
          .send(loginDetails)
          .end((err, res) => {
            res.should.have.status(201);
            token = res.body.data[0].token;
            //console.log(token);
            done(err);
          });
      }));
});



describe('PATCH /admin/employees/:user_id', () => {
  it('it should edit employee details', ((done) => {
    
    const employeeDetails = {
      "firstname":"koksjrkfo",
      "lastname":"lizziojroiy",
      "username":"kafta",
      "email":"kofko@test.com",
      "gender":"male",
      "phonenumber":"857894",
      "password":"komllfo"
    }
    chai.request(app)
      .patch('/api/v1/admin/employees/72')
      .set('Authorization', token)
      .send(employeeDetails)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should not edit employees details', ( (done) => {
    const employeeDetails = {
      "firstname":"koksjrkfo",
      "lastname":"lizziojroiy",
      "username":"kafta",
      "email":"kofko@test.com",
      "gender":"male",
      "phonenumber":"857894",
      "password":"komllfo"
    }
    chai.request(app)
      .patch('/api/v1/admin/employees/72')
      .set('Authorization', token1)
      .send(employeeDetails)
      .end( (err, res) => {
        res.should.not.have.status(201);
        done(err);
      });
  }))
});

describe('PATCH admin/:user_id', ()=> {
  const employeeDetails = {
    "firstname":"koksjrkfo",
    "lastname":"lizziojroiy",
    "username":"kafta",
    "email":"kofko@test.com",
    "gender":"male",
    "phonenumber":"857894",
    "password":"komllfo"
  }
  it ('admin can create new admin',( (done) => {
    chai.request(app)
    .patch('/api/v1/admin/72')
    .set('Authorization', token)
    .end((err,res) => {
      res.should.have.status(201)
      done(err);
    })
  }));

  it ('it shold not make new admin',( (done) => {
    chai.request(app)
    .patch('/api/v1/admin/72')
    .set('Authorization', token1)
    .end( (err,res) => {
      res.should.not.have.status(201)
      done(err);
    })
  }))
});

describe( 'POST /admin/auth/signup', () => {
  const employeeDetails = {
    firstname:'Mikel',
    lastname:'Arteta',
    username:'mikel_1',
    email:'coach@arsenal.com',
    gender:'male',
    phonenumber:'92837',
    password:'coach'
  }
  it('admin to create an employee', ( (done) => {
    chai.request(app)
    .post('/api/v1/admin/auth/signup')
    .set('authorization', token)
    .send(employeeDetails)
    .end( (err,res) => {
      res.should.have.status(201)
      done(err);
    });
  }));

  it('it should not create an employee', ((done) => {
    chai.request(app)
    .post('/api/v1/admin/auth/signup')
    .set('Authorization', token1)
    .send(employeeDetails)
    .end( (err,res) => {
      res.should.not.have.status(201)
      done(err)
    });
  }));

  it('it should return 409',( (done) => {
    chai.request(app)
    .post('/api/v1/admin/auth/signup')
    .set('authorization', token)
    .send(employeeDetails)
    .end( (err,res) => {
      res.should.have.status(409)
      done(err)
    });
  }));
});

