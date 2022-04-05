import express from 'express'
import fetch from 'node-fetch'
import "path";
import redis from 'redis'
import {RedisClient, RedisGet, RedisSetEx} from "./lib/plugins/redis.plugins.js";
import BodyHandler from "./lib/handler/Body.handler.js";
// RedisClient.
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT,"127.0.0.1")
const app = express();
(async () => {


    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect().then((r)=> console.log('connected!'));
    //
    // ('testing',3600, 'value');
    // const value = await client.get('key');
})();
async function getRepos(req,res,next){
    try{

        console.log(`fetching data....`);
        const {id}= req.params;
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)

        const data = await response.json();

        await client.set(id,JSON.stringify({...data}));
        // RedisSetEx(id,3600,repos);


        res.status(200).json(new BodyHandler({id,data}));
    }catch(err){
        console.error(err);
        res.status(500).json({...err,error:true,message: err.message})
    }
}



async function cache(req,res,next){
    const {id} = req.params;

    try{

        const data = await client.get(id)
        if(data){
            res.status(200).json({error: false, status: 200, message: "Success Get in Redis", data : JSON.parse(data)});
        }else{
            next();
        }

        //     if (err) throw err;
        //
        //     console.log(id, "INI DIBAWAH")
        //     res.status(200).json({error: false, status: 200, message: "Success Get in Redis", data});
        }catch(err){
        console.error(err)
        next();
    }


    // await RedisClient.get(id, (err,data)=> {
    //
    //     console.log(err)
    //     if(err) throw err;
    //
    //     console.log(id, "INI DIBAWAH")
    //     if(data !== null){
    //         res.status(200).json(new BodyHandler({error:false,status:200, message: "Success Get in Redis",data})) ;
    //     }else{
    //         next();
    //     }
    // })

}

app.get('/repos/:id', cache,getRepos);



app.listen(PORT, ()=> {
    console.log(`App listening on PORT ${PORT}`)
})
