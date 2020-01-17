const chai = require('chai'),
chaiHttp = require('chai-http'),
app = require('../app'),
fs = require('fs'),
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2VsXzEiLCJhZG1pbiI6ZmFsc2UsImlkIjoxNjQsImVtYWlsIjoiY29hY2hAYXJzZW5hbC5jb20iLCJlbXBsb3llZSI6dHJ1ZSwiaWF0IjoxNTc4NjU3NDc2LCJleHAiOjE1NzkyNjIyNzZ9.x8LPFtZNiYM3Pj8b78aCxhpoKh2V39iX5MRso8z9iQY"

chai.should();
chai.use(chaiHttp);

describe('POST gif/uploads and gifs/:gifid/comments',() => {
     it('it should upload gif to cloudinary',((done) => {
        chai.request(app)
        .post('/api/v1/gifs/upload')
        .set('Authorization', token)
        .attach('image', fs.readFileSync('./pexels-photo-1851164.jpg'), 'pexels-photo-1851164.jpg')
        .end((err,res) => {
            res.should.have.status(201)
            done(err);
        });
     }));

     it('it should comment on gif',((done) => {
         const comments = {
             comment: 'your gif sucks'
         };
        chai.request(app)
        .patch('/api/v1/gifs/10/comments')
        .set('Authorization', token)
        .send(comments)
        .end((err,res) => {
            res.should.have.status(404)
            done(err);
        });
     }));
});

describe('GET /gifs',() => {
    it('it should get all gifs', ((done) => {
        chai.request(app)
        .get('/api/v1/gifs')
        .set('Authorization', token)
        .end((err,res) => {
            res.should.have.status(200)
            done(err);
        });
    }));

    it('it should get one gifs',((done) => {
        chai.request(app)
        .get('/api/v1/gifs/8')
        .set('Authorization', token)
        .end((err,res) => {
            res.should.have.status(200)
            done(err);
        });
    }));
});

describe('PACTH /gifs/:gifid', () => {
    it('it should update a gif',((done) => {
        const commentBody= {
            giflink: 'hahahaha, i am the one who is your database'
        }
        chai.request(app)
        .patch('/api/v1/gifs/8')
        .set('Authorization', token)
        .send(commentBody)
        .end((err,res) => {
            res.should.have.status(201);
            done(err);
        });
    }));
});

describe('DELETE /gifs/:gifid', () => {
    it('it should delete a gif',((done) => {
        chai.request(app)
        .delete('/api/v1/gifs/7')
        .set('Authorization', token)
        .end((err,res) => {
            res.should.have.status(200);
            console.log(res.text);
            done(err);
        })
    }));
});