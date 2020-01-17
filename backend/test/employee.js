const chai = require('chai'), 
chaiHttp = require('chai-http'),
app = require('../app');

chai.should();
chai.use(chaiHttp);

let token;
describe('POST /auth/login', () => {
    it( 'Employee should be able to login',( (done) => {
        const loginDetails = {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSCODE
        }

        chai.request(app)
        .post('/api/v1/auth/login') // remember full api URI
        .send(loginDetails)
        .end((err,res) => {
            res.should.have.status(201);
            token = res.body.data[0].token;
            exports.token = token;
            done(err);
            
        });
    } ));
});

describe('GET / employees', () => {
    it('it should get all employees',((done) => {
        chai.request(app)
        .get('/api/v1/employees')
        .set('Authorization', token)
        .end((err,res) =>{
            res.should.have.status(200)
            done(err);
        });
    }));
});

describe('GET /employees/:user_id', () => {
    it('it should get a single employee',((done) => {
        chai.request(app)
        .get('/api/v1/employees/72')
        .set('Authorization', token)
        .end((err,res) =>{
            res.should.have.status(200)
            done(err);
        });
    }));
});
exports.token = token

