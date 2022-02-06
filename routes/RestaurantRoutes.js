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


module.exports = app