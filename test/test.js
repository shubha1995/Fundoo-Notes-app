const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
const server = require('../server');
const user = require('./user.test.json');
chai.use(chaiHttp);

describe('register',()=>{
    it('givenValidDetailsShould_makedPostRequestAndRegister_Return201',(done)=>{
            const userDetails = user.user.validDetails;
            chai.request(server)
            .post('/register')
            .send(userDetails)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                done();
            });
    });
    it('givenEmptyFirstName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidFirstName;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenEmptyLastName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidLastName;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenInvalidEmailId_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidEmailId;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenWeakPassword_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithWeakPassword;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenWeakconfirmPassword_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithWeakPassword;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
});



