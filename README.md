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

Each response is of the same structure:  
    
    {
        'success'   : Boolean,
        'message'   : String,
        'error'     : Object
    }

If the call was made successfully, then error is null. Message is the data recieved from the call. Based on the request being made, the data can be structured in different ways. Usually, the result is sent as an object or an array of objects.

## Authentication
A token can be obtained by making a request to `baseurl:3005/login` with the appropriate email and password. A default admin account is provided in the configuration, and will be seeded to the database upon startup. In a production environment, the default user should be replaced. These credentials are stored as `root`.

## TODO:
- IPFilterWare and failed login attempt tracking
- Unit testing
- Parameter validation middleware
- User account verification
- Optional request logging