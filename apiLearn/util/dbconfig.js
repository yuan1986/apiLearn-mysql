const mysql = require('mysql');

module.exports = {
  //数据库配置
  config: {
    host: 'localhost',
    user: 'root',
    password: '1234',
  },
  //连接数据库，使用连接池方式
  //连接池对象
  sqlConnect: function (sql, sqlArr, callBack) {
    var connection = mysql.createConnection(this.config);
    connection.connect(function (err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      connection.query(sql, sqlArr, callBack);
      connection.end();
    });
  },

  //promise 回调
  SySqlConnect: function (sySql, sqlArr) {
    return new Promise((resolve, reject) => {
      var pool = mysql.createPool(this.config);
      pool.getConnection(function (err, conn) {
        console.log('123');
        if (err) {
          reject(err);
        } else {
          conn.query(sySql, sqlArr, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
            conn.release();
          });
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  },
};
