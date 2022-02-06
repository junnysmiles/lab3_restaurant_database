const mongoose = require('mongoose')

// Address Schema
const AddressSchema = new mongoose.Schema({
    building: Number,
    street: String,
    zipcode: String
})

// Restaurant Schema
const RestaurantSchema = new mongoose.Schema({
    address: {
        type: AddressSchema,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    restaurant_id:{
        type: Number,
        requied: true
    }
})

// Middleware POST
RestaurantSchema.post('init', (doc) => {
console.log('%s has been initialized from the db', doc._id);
});
  
RestaurantSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
});
  
RestaurantSchema.post('save', (doc) => {
console.log('%s has been saved', doc._id);
});
  
RestaurantSchema.post('remove', (doc) => {
console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)
module.exports = Restaurant