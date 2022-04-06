import {Router} from 'express'
// import PostRedis from "../../../../lib/middleware/redis-cache/post.redis.js";
import {getPostSingle} from "../../../../app/controller/post.controller.js";
import {getSinglePost} from "../../../../lib/middleware/redis-cache/post.redis.js";

const route = Router();
export default (app, redis) => {
    app.use('/posts', route)


    const cacheSingle = (key, val) => {
        redis?.client.set(key, JSON.stringify(val))
    }

    const getinCacheSingle = async (key,val)=> {
        // if(!id) res.status(200).json({error:false,message: "data not found"})
        try{
            const data = await redis?.client.get(key)
            if(data){
                return JSON.parse(data)
            }else{
                cacheSingle(key,val)
            }
        }catch(err){

        }

    }
    // console.log(redis?.client,"POST - obj client")
    route.get('/single', (req, res) => {
        res.json({message: "Success"}).status(200)
    })

    route.get('/single/:id', async (req, res, next) => {
        try {

            const data = [
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },
                {
                    title: " Lorem ipsum dolor sit amet"
                },

            ]



            const dataInCache = await getinCacheSingle(req.params.id,data)

            console.log(dataInCache)
            if(typeof(dataInCache) === "undefined"){
                res.json(data).status(200)
            }else{
                res.json(dataInCache).status(200)
            }
        } catch (err) {
            res.json({error: true, message: err.message})
        }
    })

    return app

}
