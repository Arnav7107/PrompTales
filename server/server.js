// const express = require('express');
// const cors = require('cors');
// const  mongoose = require('mongoose');
// require('dotenv').config()
// const uri = process.env.mongo_url;
// const authRoutes = require("./Routes/AuthRoutes");
// const cookieParser =  require("cookie-parser");


// const app = express();



// app.get("/",(req,res)=>{
//     res.send("Server Up");
// })


// // app.use(cors({
// //     origin:["http://localhost:3000"],
// //     method:["GET","POST"],
// //     credentials:true
// // }))

// // app.use(cors());

// const allowedOrigins = ['http://localhost:3000'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies and authentication headers to be sent
// };

// app.use(cors(corsOptions));


// // Connecting Mongodb
// async function connect() {
//     try{
//         await mongoose.connect(uri)
//         {
//             console.log("Connected to Mongo");
//         }
//     }catch(error){
//         console.log(error);
//     }
// }

//  connect();


// app.use(express.json());
// app.use(express.urlencoded({extended:false}));
// app.use(cookieParser());
// app.use("/",authRoutes);







// app.listen(4000,(req,res)=>{
//     console.log("Server running on port 4000");
// })




const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const uri = process.env.mongo_url;
require('dotenv').config()
const authRoutes = require("./Routes/authRoute");
const cookieParser = require("cookie-parser");
const uri = process.env.mongo_url;
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.open_ai_key 
});


const app = express();

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


    async function myFunction() {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: "This story begins",
      max_tokens: 30,
    });
    console.log(completion.choices[0].text);
    }
    // myFunction();  
  
    

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());


app.use(express.json());
app.use("/", authRoutes);
