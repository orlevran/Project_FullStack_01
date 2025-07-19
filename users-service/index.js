const express = require('express');
const cors = require('cors');

const DatabaseService = require('./service/DatabaseService');
const UserController = require('./controller/UserController');
//const EncryptionService = require('./service/EncryptionService');

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Proper CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

//app.options('*', cors());

app.use(express.json());

async function main()
{
    try
    {
        // DB connection
        await DatabaseService.connect();

        // Define multiple endpoints here
        const userController = new UserController();
        app.post('/api/register', userController.register_user.bind(userController));
        app.post('/api/login', userController.login_user.bind(userController));

        // Start server
        app.listen(PORT, HOST, () => {
            console.log(`🚀 Users Microservice running at http://${HOST}:${PORT}`);
        });
    }
    catch (error) {
        console.error(`Error during initialization: ${error}`);
        process.exit(1); // Exit the process with failure
    }
}

main();