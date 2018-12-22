var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlockSchema = new Schema(
  {
    currBlock: {type: Number}
  }
);

//xuất mô hình
module.exports = mongoose.model('Block', BlockSchema);