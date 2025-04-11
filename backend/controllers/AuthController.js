const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let blacklistedTokens = [];


class AuthController {


    async register(req, res){
     
        try{
            const {name , email, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({name , email ,password: hashPassword}); 
            res.status(201).json('added successfally');
        }catch (error) {
          console.error("Login error:", error);
          return res.status(500).json({ message: 'Login failed', error });
        }
    }

    async login(req, res) {
        try {
          const { email, password } = req.body;
      
          const user = await UserModel.findOne({ where: { email } });
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );
          req.session.token = token;
          req.session.user_id = user.id
      
           res.status(200).json({ message: 'Login successful' , token , id1});
      
        } catch (error) {
          console.error("Login error:", error);
          return res.status(500).json({ message: 'Login failed', error });
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];

            if (!token) {
                return res.status(400).json({ message: 'No token provided' });
            }

            blacklistedTokens.push(token);
            console.log("Blacklisted Tokens:", blacklistedTokens);

            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error("Logout error:", error);
            res.status(500).json({ message: 'Logout failed', error: error.message });
        }
    }


    isTokenBlacklisted(token) {
        return blacklistedTokens.includes(token);
    }
}

module.exports = new AuthController;