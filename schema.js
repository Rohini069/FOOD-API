const mongoose = require('mongoose')

const foodItemSchema = new mongoose.Schema({
    allergens : Array,
    food_group : String,
    description :String,
    ingredients : Array,
    serving_size : String,
    certifications : Array,
    food_item_name : String,
    health_benefits : Array,
    country_of_origin : String,
    preparation_methods : Array,
    dietary_restrictions: Array,
    brand_or_manufacturer : String,
    nutritional_information: Object
    
})

const foods = new mongoose.model('foods',foodItemSchema);
module.exports = foods;
