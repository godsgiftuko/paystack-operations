require("dotenv").config();
const http = require("http");
const path = require('path');
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const indexRoute = require("./src/routes/indexRoute");
const paystackService = require("./src/services/paystack");

const app  = express();
const router = express.Router();
const port = process.env.PORT || 3000;

const mainLib = {
	router,
	paystackService
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, './src/views/layout'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/', indexRoute(mainLib));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const server = http.createServer(app);
server.listen(port, () => console.log(`Server started on port: ${port}`));


