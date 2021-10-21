/* eslint-disable no-undef */
/* eslint-disable camelcase */
const redis = require("redis");
const client = redis.createClient();
const { logger } = require("../../logger/logger");

class Redis {
   redis_NOteById = (req, res, next) => {
     client.get("getNotesById", (error, redis_data) => {
       if (error) {
         logger.error(error);
         throw error;
       } else if (redis_data) {
         logger.info("getNotes successfully retrieved");
         res.status(200).send({
           redis_NoteById: JSON.parse(redis_data),
           message: "getNotes successfully retrieved",
           success: true
         });
       } else {
         next();
       }
     });
   }

   redis_LabelById = (req, res, next) => {
     client.get("getLabelById", (error, redis_data) => {
       if (error) {
         logger.error(error);
         throw error;
       } else if (redis_data) {
         logger.info("getLabels successfully retrieved");
         res.status(200).send({
           redis_LabelById: JSON.parse(redis_data),
           message: "getLabels successfully retrieved",
           success: true
         });
       } else {
         next();
       }
     });
   }

   setData = (key, time, redis_data) => {
     client.setex(key, time, redis_data);
   };

   clearCache = (key) => {
     client.del(key, (err, res) => {
       if (err) {
         logger.error("cache not cleared");
       } else {
         console.log("Cache cleared");
         logger.info("Cache cleared");
       }
     });
   }
}

module.exports = new Redis();
