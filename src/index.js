const express=require("express");
const cors=require("cors");
const morgan=require("morgan");
const path=require("path");
const databaseConnection=require("./databaseConnection.js")
const UserRoutes=require("./routes/UserRoutes.js")
const ProductRoutes=require("./routes/ProductRoutes.js")
//crear una instancia de express
const app=express();
//configuramos el acceso a las variables de entorno
require('dotenv').config()

//conexion a la base de datos
databaseConnection();
//configurar el puerto donde se va a ejecutar nuestrop servidor-backend
app.set("port", process.env.PORT || 9001);

//ponemos a escuchar en un puerto a nuestro backend
app.listen(app.get("port"),()=>{console.log(`BACKEND PRODUCTS LISTENING IN PORT ${app.get("port")}`);});    


//middlewares: configuraciones extras del backend que se ejecutan antes de la ruta
//1-middlewares nativos de express
app.use(express.json());//permite recibir objetos en formato json
app.use(express.urlencoded({extended:true}));//permite recibir objetod de todo tipo en las peticiones 
//2-middlewares de terceros
app.use(morgan("dev"));//proporciona detalles de las peticiones en la terminal
app.use(cors());//permite las peticiones remotas

//cargar archivos estaticos que va a ser el index.html
app.use(express.static(path.join(__dirname,"../public")));
//console.log(__dirname,"Dirname");


//creamos una ruta de prueba
/**
 * TIPOS DE PETICIONES
 * GET: obtener, pedir, leer
 * PUT/PATCH: actualizar
 * POST: crear y enviar informacion desde elo cliente al backend o servidor
 * DELETE: borrar, eliminar
 */
//req=request(contiene toda la informacion de la peticion del cliente al backend)
//res=response(contiene toda la informacion de la respuesta del servidor al cliente)
//next indica que continue con la siguiente funcion o middleware
app.get("/test", async(req, res, next)=>{
    try {
        //console.log("REQUEST-->",req);
        return res.status(200).json({success:true, message:"API IS ALIVE"})  
    } catch (error) {
        console.error(error)
        next(error);
    }
})

UserRoutes("/users", app);
ProductRoutes("/products", app);