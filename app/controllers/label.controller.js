/* eslint-disable no-undef */
const { logger } = require("../../logger/logger");
const labelService = require("../service/label.service");
const { validateLabel } = require("../middleware/validation");
const redisjs = require("../middleware/redis");
class Label {
  /**
      * @description function written to create label into database
      * @param {*} a valid req body is expected
      * @param {*} res
      */
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

    /**
      * @description function written to get all labels
      * @param {*} req
      * @param {*} res
      */
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

    /**
      * @description function written to get label by ID
      * @param {*} req
      * @param {*} res
      */
    labelGetById = async (req, res) => {
      try {
        const labelId = req.params.id;
        const id = { userId: req.userData.id, noteId: req.params.id };
        const data = await labelService.labelGetById(id);
        if (data.message) {
          return res.status(404).json({
            message: "label not found",
            success: false
          });
        }
        redisjs.setData(labelId, 60, JSON.stringify(data));
        return res.status(200).json({
          message: "label retrieved succesfully",
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: "Server Error",
          success: false,
          data: err
        });
      }
    }

    /**
      * @description function written to update label
      * @param {*} a valid req body is expected
      * @param {*} res
      */
    updateLabel =async (req, res) => {
      try {
        const labelId = req.params.id;
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
          redisjs.clearCache(labelId);
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

    /**
      * @description function written to delete label by ID
      * @param {*} req
      * @param {*} res
      */
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
