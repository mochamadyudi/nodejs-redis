import redis from 'redis'
import BodyHandler from "../handler/Body.handler.js";

export default class RedisPlugins {
    // REDIS_PORT = process.env.REDIS_PORT || 6379;

    constructor(props = {}) {
        this.client = props
        // return this.client;
    }

    async connected() {
        this.client.on('error', function (err) {
            console.error(`Redis Client Error ${err}`)
        })
        await this.client.connect()
            .then(function () {
                console.log("Connected!")
            })
            .catch((err) => {
                console.error(err?.message)
            })
    }

    async clientSet(key, value, stringify = false) {
        try {
            // if(stringify){
            // console.log(JSON.stringify(value),this.client.setEx(key,JSON.stringify(value)))
            await this.client.set(key, JSON.stringify(value))
            // }else{
            //     return await this.client.set(key,value)
            // }
            return null;
        } catch (err) {
            console.error(err?.message, "Client Set")
        }
    }

    async clientGet(key, parse = false) {
        try {
            if (parse) {
                const data = await this.client.get(key)
                return data;
            } else {
                const data = await this.client.get(key)
                if (data) {
                    return JSON.parse(data)
                } else {
                    return null
                }
            }
        } catch (err) {
            console.error(err?.message, "get")
            return null
        }
    }
}


// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient({url:`redis://127.0.0.1:6379`});
// const RedisClient = client;
// function RedisSetEx(key,times = 3600, value){
//     try{
//         client.setEx(key,times,value)
//         return true;
//     }catch(err){
//         return false;
//     }
// }
// function RedisGet(key,res,next = ()=> {}){
//     try{
//         client.get(key, (err,data)=> {
//             if(err) throw err;
//
//             if(data !== null){
//                 res.status(200).json(new BodyHandler({error:false,status:200, message: "Success Get in Redis",data})) ;
//             }else{
//                 next();
//             }
//         })
//     }catch(err){
//         next();
//     }
// }
//
// export {
//     RedisClient,
//     RedisSetEx,
//     RedisGet
// };


// export default class RedisPlugins {
//     constructor(props) {
//         this.key = props?.key ?? null
//     }
// }
