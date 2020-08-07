const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let app = express();

const PORT = process.env.PORT || 8000;
const ENV = app.get('env');

app.use(helmet());
app.use(logger(ENV === 'development' ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/')));

app.disable('x-powered-by');

app.get('*', (req, res) => { // Main page
    //Default get request (Angular or React Application)
    res.sendFile(path.resolve(__dirname, '../', 'client/', 'index.html'));
});

app.listen(PORT, () => { //Add domain to listen by ip
    console.log(`Server in mode ${ENV} starting in PORT: ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.log(`Caught exception: ${err}\n${err.stack}`);
});
