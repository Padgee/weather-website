const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const filePath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
app.use(express.static(filePath))
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index', {
        title: "Weather",
        name: "Ahmed Samir"
    })
})
app.get('/about', (req,res)=>{
    res.render('About', {
        name:"Ahmed Samir",
        title: "About Me"
    })
})
app.get('/help', (req,res)=>{
    res.render('Help', {
        text: "How can I help you?",
        title: "Help Page"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({error: "You must provide an address"})
    }
    const address = req.query.address;
    forecast.forecast(address,(error,data)=>{

        if(error) return res.send({error});

        res.send(data )
    })
    
})


app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: "404",
        text: "Help article not found1"
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: "404",
        text: "Page Not Found!"
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}.`)
})