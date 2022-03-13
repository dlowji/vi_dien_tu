const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const route = require('./routes/index');
const dotenv = require('dotenv');

//Load config
dotenv.config({
    path: `${__dirname}/.env`
});

const app = express();
const PORT = process.env.PORT || 3333;

//Static file
app.use(express.static(path.join(__dirname, 'public')));

//Template engine
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//Morgan
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//JSON body
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//Route init
route(app);

app.listen(PORT, () => {
    console.log(`App is listening on ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
})
