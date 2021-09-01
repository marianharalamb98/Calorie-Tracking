const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    calories:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default: Date.now,
        required:true
    },
    mealtype:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})
mongoose.model('Meal',mealSchema);