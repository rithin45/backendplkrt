const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("plot bookings DB")})
.catch(err=>console.log(err));
let fr=mongoose.Schema;
const pbookSchema = new fr({
    productId: {
        type: String.name,
        ref: 'plots'
      },
      name: String,
      email: String,
      phone: String,
      date:String,
  });
  var pbookmodel=mongoose.model("pbooking",pbookSchema)
module.exports=pbookmodel;