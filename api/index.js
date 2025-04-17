// Pakages: express,nodemon,mongoose,dotenv,multer
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
//routes requiring
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
//For uploading file
const multer = require("multer");
const path = require("path")

// creating App
const app = express()

// dotenv configration
dotenv.config()

//in order to user json 
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

// connecting to MongoDB with mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to MongoDB")).catch(err => console.log(err))

//_____________________________________________________________________________________

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  
//_____________________________________________________________________________________

// APIs addressing unsing route() in express app.use("/api/name", nameRoute)
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);






// make a port
app.listen("5800",() =>{
console.log("Server is running on port 5800!");
});