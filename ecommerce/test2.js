const express=require("express");
const app=express();
const axios = require('axios');

    axios.get('http://localhost:5050/hello')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

app.listen(5051)