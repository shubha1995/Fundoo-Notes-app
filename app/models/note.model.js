const { logger } = require("../../logger/logger");
const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true

});

const NoteRegister = mongoose.model("NoteRegister", noteSchema);
class Model {
    createNote = (info, callback) => {
      const note = new NoteRegister({
        userId: info.userId,
        title: info.title,
        description: info.description
      });
      note.save((error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNote = (callback) => {
      NoteRegister.find({}, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNote = (id, callback) => {
      NoteRegister.find({ userId: id.id }, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }
}
module.exports = new Model();
