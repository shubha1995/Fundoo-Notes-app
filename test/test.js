const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const user = require("./user.test.json");
chai.should();
chai.use(chaiHttp);

describe("User Registration ", () => {
  it("given_validDetails_WhenCorrect_ShouldReturn201", (done) => {
    const userDetails = user.user.validDetails;
    chai
      .request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });

  it("givenEmptyFirstName_shouldReturnStatus400", (done) => {
    const userDetails = user.user.detailsWithEmptyFirstName;
    chai.request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("givenEmptyLastName_shouldReturnStatus400", (done) => {
    const userDetails = user.user.detailsWithEmptyLastName;
    chai.request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        done();
      });
  })
  ;
  it("givenInvalidEmailId_shouldReturnStatus400", (done) => {
    const userDetails = user.user.detailsWithInvalidemail;
    chai.request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
  it("givenWeakPassword_shouldReturnStatus400", (done) => {
    const userDetails = user.user.detailsWithWeakPassword;
    chai.request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.have.property("success").eql(false);
        done();
      });
  });
});

describe("Login", () => {
  it("givenLoginDetails_whenProper_UserLogin_successfully", (done) => {
    const loginDetails = user.user.login;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          console.log("error");
        }
        res.should.have.status(200);
        done();
      });
  });

  it("givenLoginDetails_when_WrongPassword", (done) => {
    const loginDetails = user.user.loginWrongPassword;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          console.log("error");
        }
        res.should.have.status(400);
        done();
      });
  });

  it("givenLoginDetails_whenNo_Password", (done) => {
    const loginDetails = user.user.loginWithoutPassword;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          console.log("error");
        }
        res.should.have.status(400);
        done();
      });
  });

  it("givenLoginDetails_whenWrongEmail", (done) => {
    const loginDetails = user.user.loginWithWrongEmail;
    chai
      .request(server)
      .post("/login")
      .send(loginDetails)
      .end((err, res) => {
        if (err) {
          console.log("error");
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("forgotPassword", () => {
  it("givenValidData_whenProper_souldAbleToSendEmailToUserEmail", (done) => {
    const forgotPasswordDetails = user.user.userForgotPassword;
    chai.request(server)
      .post("/forgotpassword")
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done("Invalid details received instead of valid");
        }
        res.should.have.status(200);
        return done();
      });
  });
  it("givenInValidEmail_shouldNotAbleToSendEmailToUserEmail", (done) => {
    const forgotPasswordDetails = user.user.userForgotPasswordisInvalid;
    chai.request(server)
      .post("/forgotpassword")
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done("email-id is empty or unable to fetch details");
        }
        return done();
      });
  });
});

describe("resetpassword for positive and negative ", () => {
  it("GivenResetPasswordDetails_WhenProper_Password_Successfully_Reset", (done) => {
    const resetPasswordDetails = user.reset.resetPassword;
    const token = user.reset.tokenOne;
    chai
      .request(server)
      .post("/resetpassword")
      .set({ authorization: token })
      .send(resetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("Password reset");
        done();
      });
  });
  it("GivenResetPasswordDetails_When_Token_Has_Expiered_Or_Wrong", (done) => {
    const resetPasswordDetails = user.reset.resetPassword;
    const token = user.reset.tokenTwoInvaild;
    chai
      .request(server)
      .post("/resetpassword")
      .set({ authorization: token })
      .send(resetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenResetPasswordDetails_When_Token_ArrayOfIndex_Wrong", (done) => {
    const resetPasswordDetails = user.reset.resetPassword;
    const token = user.reset.tokenInvaild;
    chai
      .request(server)
      .post("/resetpassword")
      .set({ authorization: token })
      .send(resetPasswordDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});
