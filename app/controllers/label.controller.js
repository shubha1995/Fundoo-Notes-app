const { logger } = require("../../logger/logger");
const labelService = require("../service/label.service");
const { validateLabel } = require("../middleware/validation");
class Label {
    createLabel = (req, res) => {
      try {
        const valid = validateLabel.validate(req.body);
        if (valid.error) {
          logger.error("Invalid label body");
          return res.status(400).send({
            message: "Please enter valid label",
            success: false,
            error: valid.error
          });
        } else {
          const label = {
            labelName: req.body.labelName,
            userId: req.userData.id
          };
          labelService.createLabel(label, resolve, reject);
          function resolve (data) {
            logger.info("Label inserted");
            res.status(201).send({
              message: "Label created successfully",
              success: true,
              data: data
            });
          }
          function reject () {
            logger.error("Label not created");
            res.status(500).send({
              message: "Label not created",
              success: false
            });
          }
        }
      } catch {
        logger.error("Label not created error occured");
        return res.status(500).send({
          message: "Error occured",
          success: false
        });
      }
    }

    getLabel = (req, res) => {
      const id = req.userData.id;
      labelService.getLabel(id, (resolve, reject) => {
        if (resolve.length > 0) {
          logger.info("Found all labels");
          res.status(200).send({
            message: "labels retrieved",
            success: true,
            data: resolve
          });
        } else {
          logger.error("Label Not found");
          res.status(404).send({
            message: "Labels not found ",
            success: false
          });
        }
      });
    }

    getLabelById = (req, res) => {
      const id = req.params.id;
      labelService.getLabelById(id, (resolve, reject) => {
        if (resolve) {
          logger.info("Found label by id");
          res.status(200).send({
            message: "label Found",
            success: true,
            data: resolve
          });
        } else {
          logger.error("Label not found by id");
          res.status(500).send({
            message: "label not Found",
            success: false
          });
        }
      });
    }
}
module.exports = new Label();
