const UserController=require("../controllers/userController");
const Auth=require("../utils/AuthMiddlewares")

const UserRoutes=(base, app)=>{
    const controller= new UserController();
    app.post(`${base}/create-admin`, async(req, res)=>{
        try {
           const{email, password}=req.body;
           await controller.CreateNewAdmin(email, password);
           return res.status(201).json({message: "Exito al crear el usuario"})
        } catch (error) {
           console.error("Error al crear un nuevo usuario-->",error) 
           return res.status(500).json({message: "Ocurrio un error al intentar crear el usuario"})
        }
    });

    
    app.post(`${base}`, Auth.isAuth, Auth.isAdmin, async(req, res)=>{
        try {
           const{email, password}=req.body;
           await controller.CreateNewUser(email, password);
           return res.status(201).json({message: "Exito al crear el usuario"})
        } catch (error) {
           console.error("Error al crear un nuevo usuario-->",error) 
           return res.status(500).json({message: "Ocurrio un error al intentar crear el usuario"})
        }
    });

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try {
            const id=req.params.id;
            const response=await controller.DeleteuserById(id);
            console.log("USUARIO ELIMINADO-->", JSON.stringify(response));
            return res.status(200).json({message: "Exito al eliminar el usuario"})
        } catch (error) {
            console.error("Error al eliminar un usuario-->",error)
            return res.status(500).json({message:"Ocurrio un error al intentar eliminar un usuario"});
        }
    })

    app.post(`${base}/login`, async(req, res, next)=>{
        try {
            const response= await controller.Login(req, res)
            return response
        } catch (error) {
            next(error)
        }
    })
};

module.exports=UserRoutes;