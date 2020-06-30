const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vue_mall'
});

//2. 连接数据库
connection.connect();

//3. 导出模型
module.exports = connection;