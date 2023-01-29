// write an express server
const express = require('express');
const app = express(); 
app.use(express.json());
app.use (express.urlencoded({ extended: true }));


const newUserCreationHandler = (req, res) => {
    const aadhar = req.body.aadhar;
    
};

module.exprts = newUserCreationHandler;