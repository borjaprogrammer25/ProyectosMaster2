const mongoose = require("mongoose");

const GENRES = ["Drama", "Comedy", "Sci-fi", "Documentary", "Thriller"];

const showScheme = new mongoose.Schema({
    title: {type:String, required: true, trim:true},
    genre: {type:String, required:true, enum:GENRES},
    raiting: {type:Number, required: false, min: 0, max: 10, default:0},
    seasons: {type:Number, required: true, min:1},
    year: {type:Number, required: true, min: 1931, max: 2031},
    watched: {type:Boolean, required: false, default:false}
}, {
    timestamps: true,
    versionKey: false
} 
);

const Show = mongoose.model("Show", showScheme);
module.exports = Show;