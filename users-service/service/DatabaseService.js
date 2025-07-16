const mongoose = require('mongoose');
require('dotenv').config();

class DatabaseService {
    static async connect()
    {
        try{
            await mongoose.connect(process.env.MONGODB_URI, {dbName: 'app-01-fullstack'});
            console.log('✅ Connected to MongoDB Atlas');
        }
        catch (error) {
            console.error(`Database connection error: ${error}`);
            throw error;
        }
    }
}

module.exports = DatabaseService;