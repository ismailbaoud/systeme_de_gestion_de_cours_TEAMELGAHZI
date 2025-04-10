const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



class AuthController {


    async register(req, res){
        try{
            const {name , email, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({name , email ,password: hashPassword});            
            res.status(201).json('added successfally');
        }catch{

        }
    }

  
}

module.exports = new AuthController;