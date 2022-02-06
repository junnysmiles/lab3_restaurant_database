const express = require('express')
const restaurantModel = require('../models/Restaurant')
const app = express()

// GET all restaurants
// http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find({})

    try {
        res.status(200).send(restaurants)
    } catch(err) {
        console.log("ERROR: Couldn't get all records..." + err)
        res.status(500).send(err)
    }
})

// POST a restaurant / Create a New Record
// http://localhost:3000/restaurant
app.post('/restaurant', async (req, res) => {
    console.log(req.body)
    const restaurant = new restaurantModel(req.body)

    try {
        await restaurant.save()
        res.send(restaurant)
        res.status(200).send("Restaurant Added")
    } catch(err) {
        console.log("ERROR: Restaurant Not Added..." + err)
        res.status(500).send(err)
    }
})

// GET by cuisine / Search by Cuisine
// http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine

    // Static Method to Query
    const restaurants = await restaurantModel.getRestaurantByCuisine(cuisine)

    try {
        if(restaurants.length != 0){
            res.send(restaurants)
        } else {
            res.send(JSON.stringify({status: false, message: "No data found"}))
        }
    } catch(err) {
        console.log("ERROR: " + err)
        res.status(500).send(err)
    }
})


module.exports = app