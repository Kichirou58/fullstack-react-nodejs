var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'Namcoi9900',
  port: 5432,
})

/* GET home page. */
router.get('/', function (req, res, next) { });

// api get data from postgreSql
router.get('/getData01', function (req, res, next) {
  // select data
  pool.query('SELECT * FROM product_info', (error, response) => {
    if (error) {
      console.log(error);
    } else {
      res.send(response.rows);
    }
    //pool.end();
  })
});

/* Add Product */
router.get('/add', function (req, res, next) {
  res.render('add', {});
});

/* Add Product */
router.post('/add', function (req, res, next) {
  var productName = req.body.product_name;
  var productPrice = req.body.product_price;
  var image = req.body.image;

  // insert data
  pool.query("INSERT INTO product_info(product_name, product_price, image) VALUES ($1, $2, $3)", [productName, productPrice, image], (error, responseInsert) => {
    if (error) {
      console.log(error);
    } else {
      res.send('Đã thêm mới thành công!');
    }
    //pool.end();
  })
});

module.exports = router;
