const labelModel = require("../models/label.model");
class Service {
    createLabel = (label, resolve, reject) => {
      labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    }

    getLabel =(id, callback) => {
      labelModel.getLabel(id).then((data) => { callback(data, null); })
        .catch((err) => { callback(null, err); });
    }

    getLabelById = (id, callback) => {
      labelModel.getLabelById(id).then((data) => { callback(data, null); })
        .catch((err) => { callback(null, err); });
    }

    async updateLabel (label) {
      try {
        return await labelModel.updateLabel(label);
      } catch (error) {
        return error;
      }
    }
}
module.exports = new Service();
