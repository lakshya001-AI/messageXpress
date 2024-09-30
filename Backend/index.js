const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDb = require("./MongoDB/connectMongoDB");
const messageModel = require("./MongoDB/model");
dotenv.config();
connectMongoDb();

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Server is running");
});

app.post("/sendMessage", async (req, res) => {
    try {
        const { name, mobile, message } = req.body;
        if (!name || !mobile || !message) {
            return res.status(400).send({ message: "All fields are required" }); // Handle missing fields
        }
        
        const data = await messageModel.create({ // 'create' instead of 'Create'
            Name: name,
            MobileNo: mobile,
            Message: message
        });

        if (data) {
            res.status(200).send({ message: "Data added successfully" });
        } else {
            res.status(400).send({ message: "Failed to add data" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "An error occurred while adding data" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`);
});


