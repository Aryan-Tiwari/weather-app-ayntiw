const express = require('express')
const hbs = require('hbs')
const path = require('path')
const weatherData = require('../utils/weatherData')
const app = express()



const PORT = process.env.PORT || 5000
const publicStaticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicStaticDirPath))



app.get('', (req, res)=>{
    res.send("hi, this is our weather app");
})

// localhost:3000/weather?address=X
app.get('/weather', (req, res)=>{
    const address = req.query.address

    weatherData(address, (error, {temprature, description, cityName})=>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temprature, description, cityName);
        res.send({
            temprature,
            description,
            cityName
        })
    })
})


app.get('*', (req, res)=>{
    res.send('page not found')
})


app.listen(PORT, ()=>{
    console.log(`server is up and running on ${PORT}`)
})