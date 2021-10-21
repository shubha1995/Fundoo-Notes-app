/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
chai.use(chaiHttp);
const labelDB = require("./label.test.json");
chai.should();

describe("create label api", () => {
  it("label", (done) => {
    const token = labelDB.label.validToken;
    const createlabel = {
      labelName: faker.lorem.word()
    };
    console.log(createlabel);
    chai
      .request(server)
      .post("/createlabel")
      .set({ authorization: token })
      .send(createlabel)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenCreatelabel_whenInvalidToken_shouldNotbeCreated", (done) => {
    const token = labelDB.label.invalidToken;
    const createlabel = {
      labelName: faker.lorem.word()
    };
    console.log(createlabel);
    chai
      .request(server)
      .post("/createlabel")
      .set({ authorization: token })
      .send(createlabel)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("GivenLabelDetails_When_Label_Name_Empty", (done) => {
    const token = labelDB.label.validToken;
    const createLabel = {
      labelName: ""
    };
    chai
      .request(server)
      .post("/createlabel")
      .set({ authorization: token })
      .send(createLabel)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});

// get label test cases
describe("get label api", () => {
  it("label", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/getlabels")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenCreateLabel_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = labelDB.label.getlabelWithInValidToken;
    chai
      .request(server)
      .get("/getlabels")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// update label test cases
describe("Update label api", () => {
  it("givenPoperDetails_ShouldUpdatelabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    const note = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/updatelabel/6166f628f1723857ed419e6c")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenInvalidToken_ShouldUpdatelabel", (done) => {
    const token = labelDB.label.getlabelWithInValidToken;
    const note = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/updatelabel/6166c7b44111f13149649f2b")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// delete label test cases
describe("delete label api", () => {
  it("givenPoperDetails_ShouldDeletelabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .delete("/deletelabel/6166df9fa5f21ab8c18c93e8")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it("givenInvalidToken_ShouldDeletelabel", (done) => {
    const token = labelDB.label.getlabelWithInValidToken;
    chai
      .request(server)
      .delete("/deletelabel/6165357e39139e12b1b2986f")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get data by id
describe("Get label by ID api", () => {
  it("givenPoperDetails_ShouldGetlabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/getlabel/6166f628f1723857ed419e6c")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Get Redis label by ID api", () => {
  it("givenPoperDetails_ShouldGetlabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/getlabel/616ce997ae71e740384ed733")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givenPoperDetails_ShouldGetlabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/getlabel/616ce997ae71e740384ed733")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("Update label api", () => {
  it("givenPoperDetails_ShouldUpdatelabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    const note = labelDB.updatelabel.validData;
    chai
      .request(server)
      .put("/updatelabel/6166f628f1723857ed419e6c")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givenPoperDetails_ShouldGetlabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/getlabel/6166f628f1723857ed419e6c")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("givenPoperDetails_ShouldGetlabel", (done) => {
    const token = labelDB.label.getlabelWithValidToken;
    chai
      .request(server)
      .get("/getlabel/6166f628f1723857ed419e6c")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
