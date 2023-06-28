const express = require("express");
const path = require('path');
const bodyparser = require("body-parser")
const session = require("express-session")
const { v4: uuidv4 } = require('uuid');
const nocache =require('nocache');
const router = require('./router')



const app = express();
app.use(nocache())
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app
// Load static assets
app.use(express.static(path.join(__dirname,'public')));
// app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache,private,no-Store,must-revalidate,max-scale=0,post-check=0,pre-check=0');
    next();
  })
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));
app.use('/',router)
// app.use('/route',router);




app.listen(port, () => {
    console.log("Listening to the server on http://localhost:3000");
});
