const chai = require('chai'),
chaiHttp = require('chai-http'),
app = require('../app'),
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2VsXzEiLCJhZG1pbiI6ZmFsc2UsImlkIjoxNjQsImVtYWlsIjoiY29hY2hAYXJzZW5hbC5jb20iLCJlbXBsb3llZSI6dHJ1ZSwiaWF0IjoxNTc4NjU3NDc2LCJleHAiOjE1NzkyNjIyNzZ9.x8LPFtZNiYM3Pj8b78aCxhpoKh2V39iX5MRso8z9iQY";

chai.use(chaiHttp);

describe('POST /article',() => {
    it('it should create new article',((done) => {
        const article = {
            article:"what a great day"
        }
        chai.request(app)
        .post('/api/v1/articles')
        .set('Authorization', token)
        .send(article)
        .end((err,res) => {
            res.should.have.status(201);
            done(err);
        })
    }));

    it('it should create comment on article',((done) => {
        const comments = {
            comment: 'This article is spot on'
        }
        chai.request(app)
        .patch('/api/v1//articles/19/comments')
        .set('Authorization', token)
        .send(comments)
        .end((err,res) => {
            res.should.have.status(201)
            console.log(res.text)
            done(err);
        });
    }));
    
});

describe('PACTH /article ',() => {
  
    
    it('it should update article',((done) => {
        const articles = {
            article:'New article'
        }
        chai.request(app)
        .patch('/api/v1/articles/19')
        .set('Authorization', token)
        .send(articles)
        .end((err,res) => {
            res.should.have.status(201);
            done(err);
        });
    }));
});

describe('GET /ARTICLE', () => {
    it('it should get all article', ((done) => {
        chai.request(app)
        .get('/api/v1/feed')
        .set('Authorization', token)
        .end((err,res) => {
            res.should.have.status(200)
            done(err);
        });
    }));

    it('it should get one article',((done) => {
        chai.request(app)
        .get('/api/v1/articles/12')
        .set('Authorization', token)
        .end((err,res) => {
            res.should.have.status(200);
            done(err);
        });
    }));
});

describe('DELETE /article',() => {
    it('it should delete article',((done) => {
        chai.request(app)
        .delete('/api/v1/articles/14')
        .set('Authorization', token)
        .end((err,res) => {
            res.should.have.status(200);
            done(err);
        })
    }));
});