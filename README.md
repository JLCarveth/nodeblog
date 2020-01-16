# restful-cms
A restful content management system. Offers features such as:  
- Role-based access control (RBAC)
- User authentication
- IP address filtering / blocking

## Project Structure
- **models**: All of the database models are stored here.
- **services**: The business logic layer.
- **api**: Contains all Express.js routes
- **subscribers**: Event handlers for any asynchronous tasks (TODO)
- **config**: System configuration. 
- **middlewares**: Express.js middlewares are stored here.
- **utilities**: Utility modules, such as hashing, email validation.

## Request / Response Structure
All API requests and responses follow a project-wide standardized format. By default, the server runs on port `3005`; this can be changed in `config.json`. For any route that requires authorization, a token must be provided in the request's `x-access-token` header.   

A token can be obtained by making a request to `baseurl:3005/login` with the appropriate email and password. A default admin account is provided in the configuration, and will be seeded to the database upon startup. In a production environment, the default user should be replaced, and `"root"` variable in the configuration should be set to an empty object `{}`.

## TODO:
- IPFilterWare and failed login attempt tracking
- Unit testing
- Parameter validation middleware
- User account verification