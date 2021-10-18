const { logger } = require("../../logger/logger");
const noteModel = require("../models/note.model");
class Service {
    createNote = (note, resolve, reject) => {
      noteModel
        .createNote(note)
        .then((data) => resolve(data))
        .catch(() => reject());
    };

    getNote = (id, callback) => {
      noteModel.getNote(id, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNoteById = async (id) => {
      try {
        return await noteModel.getNoteById(id);
      } catch (err) {
        return err;
      }
    }

    updateNoteById = (updateNote, callback) => {
      noteModel.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      }
      );
    }

    deleteNoteById = async (id) => {
      try {
        return await noteModel.deleteNoteById(id);
      } catch (err) {
        return err;
      }
    }

    addLabelById = async (id) => {
      try {
        const data = await noteModel.addLabelById(id);
        return data;
      } catch (error) {
        return error;
      }
    }

    deleteLabel = async (id) => {
      try {
        const data = await noteModel.deleteLabel(id);
        return data;
      } catch (error) {
        return error;
      }
    }
}
module.exports = new Service();
