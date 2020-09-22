const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


// Conectando ao MongoDB

connectDB()


app.use('/', require('./routes/hello'))
app.use('/envio', require('./routes/api/form'))
app.use('/user', require('./routes/api/user'))

app.listen(3000, () => console.log("Conectado"))