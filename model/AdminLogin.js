const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("login DB")})
.catch(err=>console.log(err));
const logschema=new mongoose.Schema({
username:String,
password:String,
}
);
var data2model=mongoose.model("Log",logschema)
module.exports=data2model