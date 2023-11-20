const mysql = require('mysql2');
// Kết nối đến cơ sở dữ liệu

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hethongcapnuoc',

});

connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối CSDL:', err);
    } else {
        console.log('Đã kết nối đến CSDL');
    }
});

module.exports = connection;
