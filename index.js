const express = require('express');
const routes = require('./routes/api.js');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/ninjago', {useNewUrlParser : true, useUnifiedTopology :true});

app.use(express.static('public'));

app.use('/api',routes);

//Error handling middleware

app.use(function(err,req,res,next){
  //console.log(err);
  res.status(422).send({error : err.message})
})

//Listen for requests

app.listen(process.env.port || 4000, function(){
  console.log('Now listening for requests');
});
