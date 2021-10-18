const { logger } = require("../../logger/logger");
const labelService = require("../service/label.service");
const { validateLabel } = require("../middleware/validation");
class Label {
    createLabel = (req, res) => {
      try {
        const valid = validateLabel.validate(req.body);
        if (valid.error) {
          logger.error("Invalid label body");
          return res.status(401).send({
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

    updateLabel =async (req, res) => {
      try {
        const valid = validateLabel.validate(req.body);
        if (valid.error) {
          logger.error("Invalid label given to update");
          return res.status(400).send({
            message: "Please enter valid label",
            success: false,
            error: valid.error
          });
        } else {
          const label = {
            labelName: req.body.labelName,
            labelId: req.params.id
          };
          const updatedlabel = await labelService.updateLabel(label);
          if (updatedlabel.message) {
            logger.error("Label to be updated not found");
            return res.status(404).send({
              message: "Label Not Found",
              success: false
            });
          }
          logger.info("label updated");
          return res.status(200).send({
            message: "label updated",
            success: true,
            data: updatedlabel
          });
        }
      } catch (error) {
        logger.error("Label to be updated not foudn due to error");
        return res.status(500).send({
          message: "Failed to update label",
          success: false,
          data: error
        });
      }
    }

    deleteLabelById = async (req, res) => {
      try {
        const id = { userId: req.userData.id, labelId: req.params.id };
        const data = await labelService.deleteLabelById(id);
        if (data.message) {
          return res.status(404).json({
            message: "label not found",
            success: false
          });
        }
        return res.status(200).json({
          message: "label Deleted succesfully",
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: "label not deleted",
          success: false,
          data: err
        });
      }
    }

    addNoteId = async (id, res) => {
      try {
        await labelService.addNoteId(id);
        return;
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Label();
