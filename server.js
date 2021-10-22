const WeaValue = require("./Model/weatherSchema")
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//where login and register function
app.use('/api/users', userRoutes);
// app.use(notFound);
app.use(errorHandler);


//--------------------deployment--------------------
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", 'build', 'index.html'));
    });
} else {
    //App route
    app.get('/', (req, res) => {
        res.send("Server running on web");
    })  
}
//--------------------deployment--------------------

//Get Weather
app.get('/weathers', (req, res) =>{
    WeaValue.find().then(weather_stats => res.json(weather_stats));
})

//Add Weather
app.post('/newWeather', (req, res) =>{
    const location = req.body.location

    var countryTitle, countryType, countryLatLon, wheatherStatus, wheatherDesc, weatherIcon, weatherCountry, wheatherPressure, wheatherHumid;

    const querystr2 = `https://www.metaweather.com/api/location/search/?query=${location}`
    axios.get(querystr2).then((response) => {
        countryTitle = response.data[0].title;
        countryType = response.data[0].location_type;
        countryLatLon = response.data[0].latt_long;

        const key2 = "d9b4d2d8a3992d5c236b1d1e8f26b8ba";
        const querystr1 = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key2}`
        
        axios.get(querystr1).then((response) => {
            wheatherStatus = response.data.weather[0].main;
            wheatherDesc = response.data.weather[0].description;
            weatherIcon = response.data.weather[0].icon;
            weatherCountry = response.data.sys.country;
            wheatherPressure = response.data.main.pressure;
            wheatherHumid = response.data.main.humidity;

             weaValue = new WeaValue({
                localTitle:     countryTitle,
                localType:      countryType,
                localLatLon:    countryLatLon,
                wheaStatus:     wheatherStatus,
                wheaStatusDesc: wheatherDesc,
                wheaIcon:       weatherIcon,
                wheaCount:      weatherCountry, 
                wheaPressure:   wheatherPressure,
                wheaHumid:      wheatherHumid,
            });

            weaValue
                .save()
                .then((result) => {
                console.log("Success" + result);
                })
                .catch((error) => {
                console.log("Error" + error);
                });
        })  
    });
})

//Delete weather
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    WeaValue.findByIdAndDelete({_id: id}, (err) => {
        if(!err){
            console.log("weather profile deleted");
        } else {
            console.log(err);
        }
    })
})

//Port listen
app.listen(PORT, ()=>{
    console.log("server running on", PORT)
})