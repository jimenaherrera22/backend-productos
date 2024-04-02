const ProductController=require("../controllers/productController");
const Auth=require("../utils/AuthMiddlewares");

const ProductRoutes=(base, app)=>{

    const controller=new ProductController();

    app.post(`${base}/`, Auth.isAuth, Auth.isAdmin, async(req, res, next)=>{
        try {
            const {title, description, category}=req.body
            await controller.Create(title, description, category);
            return res.status(201).json({message: "Exito al crear el producto"})
        } catch (error) {
            console.error("Error al crear un producto-->", error);
            return res.status(500).json({message: "Ocurrio un error al intentar crear un nuevo producto"});
        }
    });
}

module.exports=ProductRoutes;