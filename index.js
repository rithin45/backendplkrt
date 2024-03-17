const express = require("express");
const cors = require("cors");
const multer = require('multer');
const mongoose = require("mongoose");

// Import the Build model
const BuildModel = require('./model/Build');
const PlotModel = require('./model/Plotdetails');
const buildmodel = require("./model/Build");
const bookmodel=require('./model/Booking')
// const pbookmodel=require('./model/Pbooking')
const pbookmodel=require('./model/Pbooking');
const data2model=require('./model/AdminLogin')

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/builds', async (request, response) => {
  try {
    // Fetch all build records from the database
    const builds = await BuildModel.find();
    response.status(200).json(builds);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route handler for '/new' endpoint
app.post('/new', upload.single('image1'), async (request, response) => {
  try {
    const { name, price, location, category } = request.body;

    if (!request.file) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new instance of BuildModel
    const newBuild = new BuildModel({
      name,
      price,
      location,
      category,
      image1: {
        data: request.file.buffer,
        contentType: request.file.mimetype
      }
    });

    // Save the data to MongoDB
    await newBuild.save();
    response.status(200).json({ message: 'Record saved' });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


//plot api

 
//   app.post('/plot',(request,response)=>{
//     console.log(request.body)
//     new PlotModel(request.body).save();
//     response.send("Record Successfully Saved")

// })
// Route handler for '/new' endpoint
app.post('/plot', upload.single('image2'), async (request, response) => {
  try {
    const { pname, pprice, plocation, pcategory } = request.body;

    if (!request.file) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new instance of BuildModel
    const newBuild = new PlotModel({
      pname,
      pprice,
      plocation,
      pcategory,
      image2: {
        data: request.file.buffer,
        contentType: request.file.mimetype
      }
    });

    // Save the data to MongoDB
    await newBuild.save();
    response.status(200).json({ message: 'Record saved' });
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/views',async(request,response)=>{
  var data=await PlotModel.find();
  response.send(data)
});
// app.get('/view',async(request,response)=>{
//   var data=await buildmodel.find();
//   response.send(data)
// });
app.get('/views/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const building = await PlotModel.findById(id);
    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }
    res.json(building);
  } catch (err) {
    console.error('Error fetching building by ID:', err);
    res.status(500).json({ error: 'Error fetching building' });
  }
});

app.get('/view/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const building = await buildmodel.findById(id);
    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }
    res.json(building);
  } catch (err) {
    console.error('Error fetching building by ID:', err);
    res.status(500).json({ error: 'Error fetching building' });
  }
});
app.get('/view', async (req, res) => {
  try {
    const buildings = await buildmodel.find();
    res.json(buildings);
  } catch (err) {
    console.error('Error fetching building data:', err);
    res.status(500).json({ error: 'Error fetching building data' });
  }
});
app.put('/edits/:id',async(request,response)=>{
  let id=request.params.id
  await PlotModel.findByIdAndUpdate(id,request.body)
  response.send("Data uploaded")
})

app.post('/bookings', async (req, res) => {
  try {
    const { productId, name, email, phone,date } = req.body;
    const booking = new bookmodel({
      productId,
      name,
      email,
      phone,
      date
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.post('/bookingss', async (req, res) => {
  try {
    const { productId, name, email, phone,date } = req.body;
    const booking = new pbookmodel({
      productId,
      name,
      email,
      phone,
      date
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.post('/Loginsearch',async(request,response)=>{
  const {username,password}=request.body;
  try{ const user=await data2model.findOne({username,password});
  if(user)
  {response.json({success: true,message:'Login Successfully'});}
  else
  {response.json({success: false,message:'Invalid Username and email'});}
  }
  catch(error)
  {
  response.status(500).json({sucess: false,message:'Error'})
  }
  })

  app.get('/bookingss', async (req, res) => {
    try {
      const bookings = await pbookmodel.find(); // Assuming pbookmodel is the Mongoose model for bookings
      res.json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  app.get('/bookings', async (req, res) => {
    try {
      const bookings = await bookmodel.find(); // Assuming pbookmodel is the Mongoose model for bookings
      res.json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

 

  
