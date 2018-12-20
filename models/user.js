var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    // unique
    public_key: {type: String, required: true},
    name: {type: String, default: null},
    picture: {type: Buffer, default: null},
    followings: [{ type: String }],
    sequence: {type: Number, default: 0},
    balance: {type: Number, default: 0},
    // energy
    transactions: {type: Number, default: 1},
  }
);

//xuất mô hình
module.exports = mongoose.model('User', UserSchema);