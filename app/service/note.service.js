const { logger } = require("../../logger/logger");
const noteModel = require("../models/note.model");
class Service {
    createNote = (note, callback) => {
      noteModel.createNote(note, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

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
}
module.exports = new Service();
