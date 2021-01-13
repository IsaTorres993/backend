const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

const dbs = require('./config/database');
const dbURI = dbs.dbProduction;
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

app.use(cors());
app.disable('x-powered-by');

require('./model');

app.use(require('./routes'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status !== 404) console.warn('Error: ', err.message, new Date());
    res.json(err);
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Running in localhost:${PORT}`)
});