import express from 'express'
import fetch from 'node-fetch'
import redis from 'redis'
// const express = require('express');
// const fetch = require('node-fetch');
// const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);


function setResponse(username,repos){
    return `<h2>${username} has ${repos} Github Repository</h2>`
}

const app = express();

async function getRepos(req,res,next){
    try{
        console.log(`fetching data....`);
        const {username}= req.params;
        const response = await fetch(`https://api.github.com/users/${username}`)

        const data = await response.json();

        const repos = data.public_repos;

        client.setEx(username,3600,repos);


        res.send(setResponse(username,repos));
    }catch(err){
        console.error(err);
        res.status(500).json({...err,error:true,message: err.message})
    }
}


app.get('/repos/:username', getRepos);



app.listen(PORT, ()=> {
    console.log(`App listening on PORT ${PORT}`)
})
