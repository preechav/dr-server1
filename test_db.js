var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password : '',
  database : 'clinic'
});

connection.connect();
connection.query('select * from dr',function(error,results,fields){
  if(error) throw error;
  console.log(results);
});

connection.end();
