/**
 * @author John L. Carveth
 * @version 0.5.5
 * 
 * Application entry point.
 */

// Where it all began...
const app = require('express')()

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

const server = app.listen(process.env.port)

server.on('clientError', (response,socket) => {
    console.log('Error starting server.')    
})