const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("plots DB")})
.catch(err=>console.log(err));


const plotSchema = new mongoose.Schema({
  pname: String,
  pprice: String,
  plocation: String,
  pcategory: String,
  image2:{
    data:Buffer,
    contentType:String,
}
});

const PlotModel = mongoose.model("plot", plotSchema);

module.exports = PlotModel;