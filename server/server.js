const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files" , express.static("files" ))

// const mongoUrl = "mongodb+srv://vanshwaldeo360:0kohejoqBYn5e35W@cluster0.sdv6m.mongodb.net/Documents-Databse";

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err.message);
//   });


//doing it my way ------ 

require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect( (process.env.DATABASE_URL), {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>console.log("Db connection succesful"))
    .catch((error)=>{
        console.log("issue in DB");
        console.error(error.message);
        process.exit(1);
    })
}

dbConnect();



const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null,  uniqueSuffix+file.originalname)
    }
  })
  

require("./pdfDetails");
const PdfSchema = mongoose.model("PdfDetails")  ;
const upload = multer({ storage: storage })
app.post("/upload-files" , upload.single("file") , async(req , res) =>{
    // console.log(req.file);
    const title = req.body.title;
    const filename = req.file.filename;
    try{
        await PdfSchema.create({title:title,pdf:filename});
        res.send({status : "ok"});
    }catch(error){
        res.json({status : error})
    }
    
});

app.get("/get-files" , async (req  , res) =>{
    try{
        PdfSchema.find({}).then((data)=>{
            res.send({status : "ok" ,  data : data} );
        });

    }catch(error) {
        console.log(error);
    }
});



app.listen(3000 , ()=>{
    console.log("Server Started");
})


 
app.get('/' , async(req , res)=>{
    res.send("Sucecess");
})