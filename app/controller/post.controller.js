import RedisPlugins from "../../lib/plugins/redis.plugins.js";

export async function getPostSingle(req,res,next,client){
    try{
        const { id } = req.params;
        // if(!id) res.status(200).json({error:false,message: "data not found"})

        const data = {error:false,data: [{id:0},{id:1},{id:2}]}

        await client.set(id,JSON.stringify(data))
        // await client.set(id,data)

        // res.json({...data}).status(200)
    }catch(err){
        console.error(err)
        // res.status(500).json({...err,"post":"Controller"})
    }
}
// export default class PostController {
//     constructor(props = {}) {
//         this.client = props?.client ?? null
//
//         return this.client
//     }
//     async getPostSingle(req,res,next){
//         try{
//             const { id } = req.params;
//             if(!id) res.status(200).json({error:false,message: "data not found"})
//
//             const data = {error:false,data: [{id:0},{id:1},{id:2}]}
//
//             await setSinglePost(this.client,id,data,true)
//
//             res.json(data).status(200)
//         }catch(err){
//
//             console.log(err?.message , "POST CONTROLLER")
//         }
//     }
//
//
// }
