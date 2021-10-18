const mongoose = require("mongoose");
const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  noteId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "NoteRegister" }]
  },

  labelName: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const LabelRegister = mongoose.model("labelRegister", labelSchema);

class Model {
    createLabel = (data) => {
      return new Promise((resolve, reject) => {
        const label = new LabelRegister({
          userId: data.userId,
          labelName: data.labelName
        });
        label.save().then((data) => resolve(data))
          .catch((error) => reject(error));
      });
    }

    getLabel = (id) => {
      return new Promise((resolve, reject) => {
        LabelRegister.find({ userId: id }).then((data) => {
          resolve(data);
        })
          .catch((error) => reject(error));
      });
    }

    getLabelById = (id) => {
      return new Promise((resolve, reject) => {
        LabelRegister.findById(id).then((data) => {
          resolve(data);
        }).catch((err) => reject(err));
      });
    }

    async updateLabel (label) {
      try {
        return await LabelRegister.findByIdAndUpdate(label.labelId, { labelName: label.labelName }, { new: true });
      } catch (err) {
        return err;
      }
    }

    deleteLabelById = async (id) => {
      try {
        return await LabelRegister.findOneAndDelete({ $and: [{ _id: id.labelId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }

    async addNoteId (id) {
      try {
        const data = await LabelRegister.findByIdAndUpdate(id.labelId, { $push: { noteId: id.noteId } }, { new: true });
        console.log(data);
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Model();
