const express = require('express');
const createError = require('http-errors');

const app = express();
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
require('./models/ModuleModel');
require('./models/LessonModel');

const sequelize = require('./config/db.config');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const lessonsRouter = require('./routes/lessons');
const enrollementRouter = require('./routes/enrollement');
const moduleRouter = require('./routes/module');


app.use(cors(corsOptions));

app.use(session({
  secret: 'QWxjRk4jO$4!kPqf1ZyySx3v7lKd#87GjE$',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/lessons', lessonsRouter);
app.use('/enrollement', enrollementRouter);
app.use('/module', moduleRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

sequelize.authenticate()
  .then(() => {
   console.log('✅ Database connection successful');

   return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Database connection successful');
  })
  
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
  

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});

module.exports = app;
