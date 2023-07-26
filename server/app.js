// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose")
const Stock = require("./models/stock")

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to mongoose")
    })


app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    try {
        const symbol = req.body.stock["symbol"]
        console.log(symbol)
        const from = req.body.stock["from"]
        console.log(from)
        const record = await Stock.findOne({symbol,from})
        if(!record){
            console.log("no record")
            const newStock = new Stock(req.body.stock)
            await newStock.save()
            res.status(200).json("data added")
        }else{
            console.log("data is present")
            res.status(404).json("Data is already present")
        }
    } catch (err) {
        console.log(err)
    }
});

app.get("/api/getStockData", async (req, res) => {
    try {
        const stock = await Stock.find()
        res.status(200).json(stock)
    } catch (err) {
        console.log(err)
    }
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));