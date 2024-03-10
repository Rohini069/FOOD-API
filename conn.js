const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/FoodAPI')
.then(()=>console.log("Database connected successfully"))
.catch(()=>console.log("Database not connected"))
