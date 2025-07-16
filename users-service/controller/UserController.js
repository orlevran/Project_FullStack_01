const EncryptionService = require('../service/EncryptionService');
const User = require('../model/User');

class UserController {

    constructor() {
        this.encryptionService = new EncryptionService();
    }

    // Register a new user
    async  register_user(req, res) {
        const { username, password, first_name, last_name, email } = req.body;

        // Validate input
        if(!username || !password || !first_name || !last_name || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try
        {
            // Check if user already exists
            // TODO: import and implement MongoDB
            const user_exists = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
            if (user_exists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Encrypt password
            const hashedPassword = await this.encryptionService.encrypt(password);

            // Create new user
            const newUser = new User({
                username,
                email: email,
                password: hashedPassword,
                first_name,
                last_name
            });

            // Save user to database
            await newUser.save();

            //  Return success response
            return res.status(201).json({ message: 'User registered successfully', user: {
                username: newUser.username,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name
            }});
        }
        catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async login_user(req, res){

        const {username, password} = req.body;

        if(!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        try{
            const user_by_username = await User.findOne({username: username});

            console.log('🔐 [LOGIN] Endpoint reached:', req.body);
            console.log('Username:', username);

            if (!user_by_username) {
                return res.status(404).json({ error: 'User not found' });
            }

            const decryptedPassword = await this.encryptionService.decrypt(user_by_username.password);
            const isPasswordValid = decryptedPassword === password;

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            return res.status(200).json({ message: 'Login successful', user: {
                username: user_by_username.username,
                email: user_by_username.email,
                first_name: user_by_username.first_name,
                last_name: user_by_username.last_name
            }});
        }
        catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UserController;
