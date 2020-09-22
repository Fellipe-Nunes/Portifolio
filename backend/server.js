const express = require('express')
var bodyParser = require('body-parser')
const connectDB = require('./config/db');

const path = require('path');
var cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;

// Init Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// Connect Database
connectDB()

app.use (function (req, res, next) {
    var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
    if (req.headers.host.indexOf('localhost') < 0 && schema !== 'https') {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});

// Define Routes
app.use('/user', require('./routes/api/user'))
app.use('/profile', require('./routes/api/profile'))
app.use('/education', require('./routes/api/education'))
app.use('/auth', require('./routes/api/auth'))

app.get('/', (req, res) => res.send('Hello!'))


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname))
})

app.listen(PORT, () => { console.log(`port ${PORT}`) })