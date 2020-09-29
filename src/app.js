const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Yuval'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yuval'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error: 'you must provide an address'
        })
    }

    geocode.geoCode(req.query.address, (error, {location, latitude , longitude}) => {
        if(error) {
            return res.send({
                error: error
            })}

            

            forecast.forecast(latitude, longitude, (error, {location, temperature, feelsLike}) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    place_name: location,
                    temperature: temperature,
                    feelsLike: feelsLike,
                    address: req.query.address
                })
            })
        }
    )
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search for the products'
        })
    }

    console.log(req.query.key)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Yuval',
        title: 'Help page'
    })
})
app.get('/help/*', (req, res) =>{
    res.render('404page', {
        name: 'Yuval',
        title: '404',
        errorMessage: 'arcticle in help not found'
    })
})
app.get('*', (req, res) => {
    res.render('404page', {
        name: 'Yuval',
        title: '404',
        errorMessage: 'page not found'
    })
    
})
app.listen(3000, () =>{
    console.log('The app is running on port 3000')
})