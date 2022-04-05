import express from 'express'
import fetch from 'node-fetch'
import "path";
import cors from "cors"
import bodyParser from 'body-parser'
import redis from 'redis'
import RedisPlugins from "./lib/plugins/redis.plugins.js";
import BodyHandler from "./lib/handler/Body.handler.js";
import {YuyuidConfig} from "./config/default.config.js";
import APiRoutes from "./routes/api/v1/index.js";
const app = express();


const PORT = process.env.PORT || 5000;


const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    enableOfflineQueue: false,
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.urlencoded({extended: true}))

app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: true}))

app.use(express.json({extended: false}))



app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
})



/**
 * Redis
 * @type {RedisPlugins}
 */
const Redis = new RedisPlugins(client)
Redis.connected()


/**
 * FOR ROUTE
 */

app.use(YuyuidConfig.apiPrefix, APiRoutes(Redis))
// app.use(YuyuidConfig.webPrefix,)

// async function getRepos(req, res, next) {
//     try {
//         const {id} = req.params;
//         const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//         const data = await response.json();
//         await Redis.clientSet(id, data, true)
//         res.status(200).json(new BodyHandler({id, data}));
//     } catch (err) {
//         res.status(500).json({...err, error: true, message: err.message})
//     }
// }
//
//
// async function cache(req, res, next) {
//     const {id} = req.params;
//
//     try {
//         const data = await Redis.clientGet(id, true)
//         if (data) {
//             res.status(200).json({error: false, status: 200, message: "Success Get in Redis", data});
//         } else {
//             next();
//         }
//     } catch (err) {
//         next();
//     }
// }
// // app
// app.get('/repos/:id', cache, getRepos);


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})
