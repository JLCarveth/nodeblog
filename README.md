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


## TODO:
- IPFilterWare and failed login attempt tracking
- Unit testing
- Parameter validation middleware
- User account verification