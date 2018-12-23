var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlockSchema = new Schema(
  {
    currBlock: {type: Number},
    key: {type:String}
  }
);

//xuất mô hình
module.exports = mongoose.model('Block', BlockSchema);