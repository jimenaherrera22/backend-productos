const UserModel=require("../models/UserModel");

class UserController{
    async CreateNewUser(email, password, role) {
    try {
        const newUser= new UserModel({
            email:email,
            password:password,
            role:role
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