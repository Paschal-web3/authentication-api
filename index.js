const express = require('express')
const app = require ('./app')
require ('dotenv').config()

port = process.env.PORT

app.listen(port, ()=>{
    try {
        console.log("Listening to ", port);
    } catch (error) {
        console.log({error: error.message})
    }
})