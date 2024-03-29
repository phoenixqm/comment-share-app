var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var port = 3000;

var app = express();


var index = require('./routes/index');
var books = require('./routes/books');
var tasks = require('./routes/tasks');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api', books);
app.use('/api', tasks);

app.listen(port, function(){
    console.log('server started on port: ' + port);
}); 






