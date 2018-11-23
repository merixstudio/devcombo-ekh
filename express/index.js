const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

const usersRouting = require('./routes/users');
const postsRouting = require('./routes/posts');

const port = 3000;
const PREFIX = '/api'
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
//routing
app.use(`${PREFIX}/users`, usersRouting);
app.use(`${PREFIX}/posts`, postsRouting);

app.listen(port, () => console.log('App started'));