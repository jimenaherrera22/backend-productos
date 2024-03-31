const UserModel=require('../models/UserModel');
const bcrypt = require('bcrypt');
const helpers=require("../utils/helpersFunction");

class UserController{
    async CreateNewAdmin(email, password) {
    try {
        if (!helpers.validateEmail(email)) {
            throw new Error("Formato de email invalido")
        }
        if(!helpers.validatePassword(password)) throw new Error("Formato password incorrecto")
        const SALT=parseInt(process.env.BCRYPT_SALT);
        const hash=await bcrypt.hash(password, SALT);
        const newUser= new UserModel({
            email:email,
            password:hash,
            role:"Admin"
        });

        const savedUser=await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}

async CreateNewUser(email, password) {
    try {
        if (!helpers.validateEmail(email)) {
            throw new Error("Formato de email invalido")
        }
        if(!helpers.validatePassword(password)) throw new Error("Formato password incorrecto")
        const SALT=parseInt(process.env.BCRYPT_SALT);
        const hash=await bcrypt.hash(password, SALT);
        const newUser= new UserModel({
            email:email,
            password:hash,
            role:"User"
        });

        const savedUser=await newUser.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}


   async DeleteuserById(id){
    try {
        const deleteUser=await UserModel.findByIdAndDelete(id);
        return deleteUser;
    } catch (error) {
        throw error
    }
   }
 };


 module.exports=UserController