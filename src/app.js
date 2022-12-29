const path = require ('path') // Included library of NodeJS
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const forecast = require('./utilis/forecast')
const geocode = require ('./utilis/geolocation')

console.log(__filename)
console.log(__dirname)

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public') // to get to public directory
const viewPath = path.join(__dirname,'../templates/views') // To get views directory
const partialPath = path.join(__dirname,'../templates/partials') // To get views directory

//Setup handlebars engine and views location (Otherwise the defailt is views)
app.set('view engine','hbs') //hbs npm module for handlebars
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // // By this we dont need to link pages using app.get 

app.get('',(req,res)=>{ // we use render for the views , its dynamic
    res.render('index',{
        title: 'Weather App',
        name: 'Anas Javaid'
    })  
})

app.get('/about',(req,res)=>{ // we use render for the views pages , its dynamic
    res.render('about',{
        title:'About Me',
        name: 'Anas Javaid'
    })  
})

app.get('/help',(req,res)=>{ // we use render for the views pages , its dynamic
    res.render('help',{
        title:'Help',
        name: 'Anas Javaid'
    })  
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'

        })
    }
    geocode(req.query.address,(error,{latitude,longitude,city}={})=>{
        if (error){
            return res.send({error})
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
                res.send(forecastData,)
            
        })
    })
       
        // res.send({
        //     forecast: 'Its snowing',
        //     location: 'Lull',
        //     address:req.query.address
        // })
   
    })

app.get('/products',(req,res)=>{
    if(!req.query.search) {          // this code only runs when there is no search (query)
        return res.send({
                error:'You must provide a search term'
    })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=> { // Its for antyhing that does not match for the help/etc
    res.send('Help article not found')
})

app.get('*',(req,res)=>{ // * means everything is matched, it should be last so that when other pages are not found then it goes here. 
    res.render('404',{
        title: '404 Error',
        message:'Page not found'
    })
})


app.listen(3000, () => { // To start the server
    console.log('Server is up on port 3000')

}) 