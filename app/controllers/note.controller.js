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
        console.log(note);
        noteService.createNote(note, (error, data) => {
          if (error) {
            logger.error("failed to post note");
            return res.status(400).json({
              message: "failed to post note",
              success: false
            });
          } else {
            logger.info("Successfully inserted note");
            return res.status(201).send({
              message: "Successfully inserted note",
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
}
module.exports = new Note();
