const createError = require('http-errors');
const express = require('express');
const path = require('path');
const db = require('./core/db');
const themeRouter = require('./routes/themeRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/theme', themeRouter);

app.get('/', (req, res)=> {
    res.render('index', {title: "Welcome"});
});

app.get('/createDB', (req, res) => {
  db.createDB(req, res);
});

app.get('/createElectionsTable', (req, res) => {
    db.createElectionsTable(req, res);
});

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
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
