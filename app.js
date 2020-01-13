/**
 * @author John L. Carveth
 * @version 0.1.0
 * 
 * Entry point for the software. 
 */

const app = require('express')()

// Third party middleware
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser') 
const cors          = require('cors')

// Database Seeder
const Seeder        = require('good-mongoose-seeder')

// Data persistence
const mongoose = require('mongoose')

// Import Routers
const ArticleRoutes = require('./api/ArticleRoute')
const IPRoutes      = require('./api/IPRoute')
const RoleRoutes    = require('./api/RoleRoute')
const UserRoutes    = require('./api/UserRoute')

// Initialize the configurator
const Configurator = require('./config/config')
Configurator.init()

// Seed the roles to the database
Seeder.addListener()
Seeder.connect(Configurator.get(mongodbURI), {
    useNewUrlParser:    true,
    useUnifiedTopology: true
}).then(() => Seeder.seedData({
    model:      'roles',
    documents:  Configurator.get('roles')
})).catch((error) => {
    console.error(error)
}).finally(() => Seeder.disconnect())

// Use the middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Initialize the routes
app.use('/blog', ArticleRoutes)
app.use('/ip', IPRoutes)
app.use('/role', RoleRoutes)
app.use('/', UserRoutes)

// Connect to the DB specified in the config
// To avoid the 'deprecated url parser' warning...
mongoose.connect(process.env.mongodbURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(error => {
    throw new Error(error)
}).then(result => {
    console.log('Mongoose database connected.')
})

const server = app.listen(process.env.port)

server.on('clientError', (response,socket) => {
    console.log('Error starting server.')    
})

server.on('connect', (response,socket,head) => {
    console.log('New connection.')
})