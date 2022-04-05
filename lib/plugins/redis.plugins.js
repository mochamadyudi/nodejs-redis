import redis from 'redis'
import BodyHandler from "../handler/Body.handler.js";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient({url:`redis://127.0.0.1:6379`});
const RedisClient = client;
function RedisSetEx(key,times = 3600, value){
    try{
        client.setEx(key,times,value)
        return true;
    }catch(err){
        return false;
    }
}
function RedisGet(key,res,next = ()=> {}){
    try{
        client.get(key, (err,data)=> {
            if(err) throw err;

            if(data !== null){
                res.status(200).json(new BodyHandler({error:false,status:200, message: "Success Get in Redis",data})) ;
            }else{
                next();
            }
        })
    }catch(err){
        next();
    }
}

export {
    RedisClient,
    RedisSetEx,
    RedisGet
};


// export default class RedisPlugins {
//     constructor(props) {
//         this.key = props?.key ?? null
//     }
// }
