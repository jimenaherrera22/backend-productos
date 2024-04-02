const mongoose=require("mongoose");
const {Schema}=mongoose;

const ProductSchema=new Schema({
    title:{
        type: String,
        required:[true, "El titulo es requerido"],
        minLength:4,
        maxLength:20,
        unique:true
    },
    description:{
        type: String,
        required:[true, "La descripcion es requerida"],
        minLength:4,
        maxLength:200
    },
    category:{
        type: String,
        required:[true, "La categoria es requerida"]
    }
});

const ProductModel=mongoose.model("product", ProductSchema);

module.exports=ProductModel;