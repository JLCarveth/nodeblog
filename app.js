/**
 * @author John L. Carveth
 * @version 0.6.0
 * 
 * Application entry point.
 */

// Where it all began...
const express = require('express')
const app = express()

// Third party middleware
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser') 
const cors          = require('cors')

// First party middleware
const RoleWare      = require('./middlewares/RoleWare')
const ParamWare     = require('./middlewares/ParamWare')

// Data persistence
const mongoose      = require('mongoose')

// Database Seeder
const Seeder        = require('good-mongoose-seeder')

// Import Routers
const Routers = require('./api')

// Initialize the configurator
const Configurator = require('./config/config')
Configurator.init()

//Set views directory
app.set('views', './views')
// Set the express view engine
app.set('view engine', 'ejs')

// Add the public folder to express
app.use(express.static('public'))

// Use the middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Connect to the DB specified in the config
// To avoid the 'deprecated url parser' warning...
mongoose.connect(Configurator.get('mongodbURI'), {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(error => {
    throw new Error(error)
}).then(result => {
    Seeder.seedData({
        model:      'roles',
        documents:  Configurator.get('roles')
    })
})

// Initialize the routes
app.use('/blog', Routers.ArticleRoute)
app.use('/ip', Routers.IPRoute)
app.use('/role', Routers.RoleRoute)
app.use('/', Routers.UserRoute)
app.use('/', Routers.ViewRoute)

const server = app.listen(process.env.port)

server.on('clientError', (response,socket) => {
    console.log('Error starting server.')    
})