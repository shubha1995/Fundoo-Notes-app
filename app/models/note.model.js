const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  labelId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "LabelRegister" }]
  },
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
    createNote = (info) => {
      return new Promise((resolve, reject) => {
        const note = new NoteRegister({
          userId: info.userId,
          title: info.title,
          description: info.description
        });
        note.save()
          .then((data) => resolve(data))
          .catch((err) => reject(err));
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

    getNoteById = async (id) => {
      try {
        return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }

    updateNoteById = (updatedNote, callback) => {
      try {
        NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      } catch (err) {
        return callback(err, null);
      }
    }

    deleteNoteById = async (id) => {
      try {
        return await NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }

    addLabelById = async (id) => {
      try {
        const data = await NoteRegister.findByIdAndUpdate(id.noteId, { $push: { labelId: id.labelId } });
        console.log(data);
      } catch (error) {
        return error;
      }
    }
}
module.exports = new Model();
