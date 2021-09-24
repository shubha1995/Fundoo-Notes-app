const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const user = require('./user.test.json');
chai.should();
chai.use(chaiHttp);

describe('User Registration ', () => {
  it("given_validDetails_WhenCorrect_ShouldReturn201", (done) => {
    const userDetails = user.user.validDetails;
    chai
      .request(server)
      .post("/register")
      .send(userDetails)
     .end((err, res) => {
        if(err){
        return done(err);
    }
        res.should.have.status(201);
        done();
      });
  });


    it('givenEmptyFirstName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithEmptyFirstName;
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
        const userDetails = user.user.detailsWithEmptyLastName;
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
        const userDetails = user.user.detailsWithInvalidemail;
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
        const userDetails = user.user.detailsWithWeakconfirmPassword;
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

describe("Login", () => {

    it("givenLoginDetails_whenProper_UserLogin_successfully", (done) => {
      const loginDetails = user.user.login
      chai
        .request(server)
        .post("/login") 
        .send(loginDetails)
        .end((err, res) => {
          if (err) {
            console.log("error")
          }
          res.should.have.status(200);
          done();
        });
    });
    /**
     * it function for login when user login with Wrong Password.
     * */
     
    it("givenLoginDetails_when_WrongPassword", (done) => {
      const loginDetails = user.user.loginWrongPassword
      chai
        .request(server)
        .post("/login")
        .send(loginDetails)
        .end((err, res) => {
          if (err) {
            console.log("error")
          }
          res.should.have.status(400);
          done();
        });
    });
    /**
     * it function for login when user login with Without Password.
     * */
    it("givenLoginDetails_whenNo_Password", (done) => {
      const loginDetails = user.user.loginWithoutPassword
      chai
        .request(server)
        .post("/login")
        .send(loginDetails)
        .end((err, res) => {
          if (err) {
            console.log("error")
          }
          res.should.have.status(400);
          done();
        });
    });
    /**
     * it function for login when user login With Wrong Email.
     * */
    it( "givenLoginDetails_whenWrongEmail", (done) => {
      const loginDetails = user.user.loginWithWrongEmail
      chai
        .request(server)
        .post("/login")
        .send(loginDetails)
        .end((err, res) => {
          if (err) {
            console.log("error")
          }
          res.should.have.status(400);
          done();
        });
    });
  });   
