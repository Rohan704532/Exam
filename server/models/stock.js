const mongoose = require("mongoose")


const stockSchema = new mongoose.Schema({
    status: {
        type:String,
        require:true,
    },
    from: {
        type:Date,
        require:true,
    },
    close: {
        type:Number,
        require:true,
    },
    symbol: {
        type:String,
        require:true,
    },
    open: {
        type:Number,
        require:true,
    },
    high: {
        type:Number,
        require:true,
    },
    low: {
        type:Number,
        require:true,
    },
    volume: {
        type:Number,
        require:true,
    },
    afterHours: {
        type:Number,
        require:true,
    },
    preMarket: {
        type:Number,
        require:true,
    }
})

module.exports = mongoose.model("Stock",stockSchema)