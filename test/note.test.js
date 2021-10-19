/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");
const noteInputs = require("./note.test.json");
const noteDB = require("./note.test.json");

chai.use(chaiHttp);
chai.should();

describe("create note api for positive and negative test case", () => {
  it("GivenNotesDetails_When_Note_Created_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenNotesDetails_When_Your_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenNotesDetails_When_Your_Title_And_Description_Is_Empty_BadRequest", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const createNotes = noteInputs.notes.EmptyTitleAndDis;
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        done();
      });
  });
});

describe("get all note api for positive and negative test case", () => {
  it("GivenGetAllNotesDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenGetAllNotesDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetAllNotesDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
});

describe("get note by id api for positive and negative test case", () => {
  it("GivenGetNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesid/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_And_Id_Both_Are_Ok", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.GetById;
    chai
      .request(server)
      .get(`/getnotesid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Is_Invalid", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.InvalidId;
    chai
      .request(server)
      .get(`/getnotesid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.EmptyId;
    chai
      .request(server)
      .get(`/getnotesid/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});

describe("update note by id api for positive and negative test case", () => {
  it("GivenUpdateNoteByIdDetails_When_Note_Get_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Token_And_Id_Both_Are_Ok", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Id_Is_Invalid", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById_InvalidId;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        done();
      });
  });
  it("GivenUpdateNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.UpdateById_EmptyId;
    const updateNote = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(server)
      .put(`/updatenotes/${id}`)
      .set({ authorization: token })
      .send(updateNote)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });
});

describe("delete note by id api for positive and negative test case", () => {
  it("GivenDeleteNoteByIdDetails_When_Note_Deleted_Successfully", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Expiered", (done) => {
    const token = noteInputs.notes.TokenExpiered;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_Has_Empty", (done) => {
    const token = noteInputs.notes.EmptyToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Token_And_Id_Both_Are_Ok", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Is_Invalid", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById_InvalidId;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(500);
        done();
      });
  });
  it("GivenGetNoteByIdDetails_When_Id_Has_Empty", (done) => {
    const token = noteInputs.notes.loginValidToken;
    const id = noteInputs.notes.DeleteById_EmptyId;
    chai
      .request(server)
      .delete(`/deletenotes/${id}`)
      .set({ authorization: token })

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(404);
        done();
      });
  });

  describe("Add label in notes api", () => {
    it("givenPoperDetails_ShouldAddLabelInNote", (done) => {
      const token = noteDB.addLebel.validToken;
      const note = noteDB.addLabelBodyData;
      console.log(note);
      chai
        .request(server)
        .post("/addlabel/6166df9fa5f21ab8c18c93e8")
        .set({ authorization: token })
        .send(note)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("Delete label in notes api", () => {
    it.only("givenPoperDetails_ShouldDeleteLabelInNote", (done) => {
      const token = noteDB.addLebel.validToken;
      const note = noteDB.deleteLabelBodyData;
      console.log(note);
      chai
        .request(server)
        .delete("/deleteLabelFromNote/6166df9fa5f21ab8c18c93e8")
        .set({ authorization: token })
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
