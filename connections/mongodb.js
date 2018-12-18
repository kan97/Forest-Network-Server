//Nhập mô-đun mongoose
var mongoose = require('mongoose');

//Thiết lập một kết nối mongoose mặc định
var mongoDB = 'mongodb://panda:panda123@ds239692.mlab.com:39692/forest-network';
mongoose.connect(mongoDB, {
    useNewUrlParser: true
}).then(() => console.log('connect mlab successfully'));
//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;
//Lấy kết nối mặc định
var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;