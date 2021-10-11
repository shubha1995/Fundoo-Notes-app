const noteService = require("../service/note.service");
const { logger } = require("../../logger/logger");

class Note {
    createNote =(req, res) => {
      try {
        const note = {

          userId: req.userData.id,
          title: req.body.title,
          description: req.body.description
        };
        noteService.createNote(note, (error, data) => {
          if (error) {
            logger.error("failed to post note");
            return res.status(400).json({
              message: "failed to post note",
              success: false
            });
          } else {
            logger.info("note inserted successfully");
            return res.status(201).send({
              message: "note inserted successfully",
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

    getNote = (req, res) => {
      try {
        const id = { id: req.userData.id };
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
        const id = {
          userId: req.userData.id,
          noteId: req.params.id
        };
        await noteService.getNoteById(id, (err, data) => {
          if (err) {
            return res.status(404).json({
              message: "Note not found",
              success: false
            });
          } else {
            return res.status(200).json({
              message: "Note retieved succesfully",
              success: true,
              data: data
            });
          }
        });
      } catch (err) {
        return res.status(401).json({
          error: err,
          success: false
        });
      }
    }
}
module.exports = new Note();
