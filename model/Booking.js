const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://dephin16:thejuspuli@cluster0.fxbesy7.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("bookings DB")})
.catch(err=>console.log(err));
let or=mongoose.Schema;
const bookSchema = new or({
    productId: {
        type: String.name,
        ref: 'builds'
      },
      name: String,
      email: String,
      phone: String,
      date:String,
  });
  var bookmodel=mongoose.model("booking",bookSchema)
module.exports=bookmodel;