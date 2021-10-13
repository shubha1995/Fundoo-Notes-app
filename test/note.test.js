/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const faker = require("faker");

chai.use(chaiHttp);
const noteDB = require("./note.test.json");
chai.should();

describe("create notes api", () => {
  it("notes", (done) => {
    const token = noteDB.notes.validToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenCreateNotes_whenInvalidToken_shouldNotbeCreated", (done) => {
    const token = noteDB.notes.invalidToken;
    const createNotes = {
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    console.log(createNotes);
    chai
      .request(server)
      .post("/createnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get note test cases
describe("get notes api", () => {
  it("notes", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenCreateNotes_whenInvalidToken_shouldNotbeGet", (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .get("/getnotes")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// update note test cases
describe("Update notes api", () => {
  it("givenPoperDetails_ShouldUpdateNote", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put("/updatenotes/615ff1878c9fe615f8a35ed8")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("givenInvalidToken_ShouldUpdateNote", (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    const note = noteDB.updateNote.validData;
    chai
      .request(server)
      .put("/updatenotes/6163a92b4ec773015a13abb0")
      .set({ authorization: token })
      .send(note)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// delete note test cases
describe("delete notes api", () => {
  it("givenPoperDetails_ShouldDeleteNote", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .delete("/deletenotes/615ff1878c9fe615f8a35ed8")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("givenInvalidToken_ShouldUpdateNote", (done) => {
    const token = noteDB.notes.getNoteWithInValidToken;
    chai
      .request(server)
      .delete("/deletenotes/6165c20f245abe3011a5ae51")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// get data by id
describe("Get notes by ID api", () => {
  it("givenPoperDetails_ShouldGetNote", (done) => {
    const token = noteDB.notes.getNoteWithValidToken;
    chai
      .request(server)
      .get("/getnotes/615ff1878c9fe615f8a35ed8")
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
