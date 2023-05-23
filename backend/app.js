let createError = require('http-errors');
let express = require('express');
const cors = require("cors");
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let { initializeDatabase } = require('./utils/dbCreateHelper');
const db = require('./config/database');
const Admin = require('./models/admins');
const adminSeeder = require('./seeders/adminSeeder');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');
let foodsRouter = require('./routes/food');
let ordersRouter = require('./routes/order');
let deliveriesRouter = require('./routes/deliveryFee');
let adminsRouter = require('./routes/admin');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/foods', foodsRouter);
app.use('/deliveries', deliveriesRouter);
app.use('/admins', adminsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//db models sync
initializeDatabase().then((res) => {
  db.sync().then((result) => {
    console.log('models synced successfully')

    // Check if the admin table is empty
    Admin.count().then((countResponse) => {

      if (countResponse === 0) {
        // Seed the admin table with data
        adminSeeder.up(null, Admin.sequelize).then((seedResponse) => {
          console.log(`Base administrator created. You can log in with "admin" as username and password`);
        });
      }
    });

  })
}).catch((err) => {
  console.log(err);
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;