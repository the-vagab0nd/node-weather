const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates')
const viewPath = path.join(templatesPath, '/views')
const partialPath = path.join(templatesPath, '/partials')

// Setup handlebars engine and views locaiton
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath)

// Setup static directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => res.render('index', {
    title: 'Hey there!',
}))

app.get('/about', (req, res) => res.render('about', {
    title: 'Weather App',
    purpose: 'tell weather'
}))

app.get('/help', (req, res) => res.render('help', {
    title: 'Help?',
    purpose: 'I cant help U...I cant help nobody.FOFF'
}))


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'Address not provided',
            error: '404',
        })
    }
    address = req.query.address
    geocode(address, (error, {
        data,
        place_name
    } = {}) => {
        if (error) {
            return res.send( {
                errorMessage: error,
                error: '404',
            })
        } else {
            lattitude = data[1];
            longtitude = data[0];
            forecast(lattitude, longtitude, (error, final_data) => {
                if (error) {
                    return res.send({
                        errorMessage: error,
                        error: '404',
                    })
                } else {
                    res.send({
                        place_is: place_name,
                        data : final_data,
                        address
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        asd: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Help'
    })
})

app.get('*', (req, res) => res.render('404', {
    errorMessage: 'Not found',
    title: '404',
}))

app.listen(3000, () => console.log('Ran successfully'))