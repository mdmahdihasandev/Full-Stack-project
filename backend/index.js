require('dotenv').config()
let express = require('express')
let app = express()
let configdata = require('./config/config')
let logincontroler = require('./controler/loginControler')
let presentationtodo = require('./controler/presentationControler')
let presentationalldata = require('./controler/presentationdatabajeControlers')
let controler = require('./controler/registrationControler')
let presentationdelete = require('./controler/presentationdatadeleted')
let presentationupdate = require('./controler/presentationupdate')

app.use(express.json())

configdata()

app.post('/registration',  controler)

app.post('/login', logincontroler)

app.post('/presentation', presentationtodo)

app.get('/alldatapass', presentationalldata)

app.delete('/deletedata/:id', presentationdelete)

app.post('/dataupdate/:id', presentationupdate)

let port = process.env.PORT || 5000

app.listen(port, ()=> {
    console.log('server running');
})

