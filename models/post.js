var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    public_key: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    keys: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    content: {
        type: {type: Number, default: 1, min: 1, max: 1, required: true},
        text: {type: String, required: true},
    }
  }
);

//xuất mô hình
module.exports = mongoose.model('Post', PostSchema);