# blogRefactor
A refactoring of the Node.js blog backend project.

## Project Structure
- **models**: All of the database models are stored here.
- **services**: The business logic layer.
- **api**: Express.js routes are defined in this module
- **subscribers**: Event handlers for any asynchronous tasks
- **config**: System configuration happens in this module. Envorinment variables are populated.
- **middlewares**: Express.js middlewares are stored here.
- **utilities**: Data validation, hashing utilities, all stored in this module.


## TODO:
- IPFilterWare and failed login attempt tracking
- Unit testing
- Parameter validation middleware