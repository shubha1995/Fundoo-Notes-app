const noteService = require("../service/note.service");
const { logger } = require("../../logger/logger");
const { validateNote, getNoteValidation } = require("../middleware/validation");
const labelController = require("../controllers/label.controller");
const redisjs = require("../middleware/redis");

class Note {
    createNote = (req, res) => {
      try {
        const note = {
          userId: req.userData.id,
          title: req.body.title,
          description: req.body.description
        };
        const valid = validateNote.validate(note);
        if (valid.error) {
          logger.error("Invalid Note");
          return res.status(400).send({
            success: false,
            message: "Please enter valid note"
          });
        }

        noteService.createNote(note, resolve, reject);
        function resolve (data) {
          logger.info("note inserted successfullye");
          return res.status(201).send({
            message: "note inserted successfully",
            success: true,
            data: data
          });
        }
        function reject () {
          logger.error("Note is not created");
          return res.status(400).json({
            message: "Note is not created",
            success: false
          });
        }
      } catch {
        logger.error("Internal server error");
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      }
    }

    getNote = (req, res) => {
      try {
        const id = { id: req.userData.id };
        const getNoteValid = getNoteValidation.validate(id);
        if (getNoteValid.error) {
          return res.status(400).send({
            success: false,
            message: "Wrong Input Validations"
          });
        }
        noteService.getNote((id), (err, data) => {
          if (err) {
            logger.error("Failed to get all notes");
            return res.status(400).json({
              message: "failed to get note",
              success: false
            });
          } else {
            logger.info("All notes retrived");
            return res.status(201).json({
              message: "Notes retrived successfully",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Error occured while retrieving notes");
        return res.status(500).json({
          message: "Internal Error"
        });
      }
    }

    getNoteById = async (req, res) => {
      try {
        const id = { userId: req.userData.id, noteId: req.params.id };
        const data = await noteService.getNoteById(id);
        if (data.message) {
          return res.status(404).json({
            message: "Note not found",
            success: false
          });
        }
        redisjs.setData("getNotesById", 60, JSON.stringify(data));
        return res.status(200).json({
          message: "Note retrieved succesfully",
          success: true,
          data: data

        });
      } catch (err) {
        return res.status(500).json({
          message: "Internal Error",
          success: false,
          data: err
        });
      }
    }

    updateNoteById =(req, res) => {
      try {
        const updateNote = {
          id: req.params.id,
          userId: req.userData.id,
          title: req.body.title,
          description: req.body.description
        };
        noteService.updateNoteById(updateNote, (error, data) => {
          if (error) {
            logger.error("Note not updated");
            return res.status(400).json({
              message: "Note not updated",
              success: false
            });
          } else {
            logger.info("Successfully note updated");
            return res.status(201).send({
              message: "Successfully note updated",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Internal server error");
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
      }
    }

    deleteNoteById = async (req, res) => {
      try {
        const id = { userId: req.userData.id, noteId: req.params.id };
        const data = await noteService.deleteNoteById(id);
        if (data.message) {
          return res.status(404).json({
            message: "Note not found",
            success: false
          });
        }
        return res.status(200).json({
          message: "Note Deleted succesfully",
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: "Note not updated",
          success: false,
          data: err
        });
      }
    }

    addLabelById = async (req, res) => {
      try {
        const id = {
          noteId: req.params.id,
          labelId: req.body.labelId,
          userId: req.userData.id
        };
        console.log(id);
        const labels = await noteService.addLabelById(id);
        await labelController.addNoteId(id);
        res.status(200).send({
          message: "Label added",
          success: true,
          data: labels
        });
      } catch (err) {
        res.status(500).send({
          message: "Label wasnt added",
          success: false,
          error: err
        });
      }
    }

    deleteLabel = async (req, res) => {
      try {
        const id = {
          labelId: req.body.labelId,
          noteId: req.params.id,
          userId: req.userData.id
        };
        await noteService.deleteLabel(id);
        res.status(201).send({
          message: "Label deleted",
          success: true
        });
      } catch (error) {
        res.status(500).send({
          message: "Label wasnt deleted",
          success: false,
          error: error
        });
      }
    }
}
module.exports = new Note();
