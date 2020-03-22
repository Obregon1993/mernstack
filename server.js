const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors'); this solve teh problem with Cors policy

const app = express();
const PORT = process.env.PORT || 8080

const routes= require('./routes/api');

//mongodb connection
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/merndb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



//checking mongo conection
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected!!!!!!')
})


// //Saving data to our mongo datebase
// const data={
//     title: 'Welcome to my app',
//     body: 'This is my first app using mern, enjoy it'
// };

// const newBlogPost= new BlogPost(data); //instance of the model

// //  
// //.save();

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//HTTP request logger

// app.use(cors());
app.use(morgan('tiny'));

app.use('/api', routes)


if(process.env.NODE_ENV==='production'){
app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`server is starting at http://localhost:${PORT}`))