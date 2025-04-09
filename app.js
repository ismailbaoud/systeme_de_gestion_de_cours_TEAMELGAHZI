var express = require('express');
var createError = require('http-errors');
var app = express();


// importer les routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  // res.status(err.status || 500);
  res.json({ message: 'errorcc'});
});

const port = 3000;

app.listen(port, ()=>{
  console.log((`Server running on http://localhost:${port}`));
  
})

module.exports = app;


