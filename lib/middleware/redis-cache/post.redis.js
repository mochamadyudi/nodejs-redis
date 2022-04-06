import RedisPlugins from "../../plugins/redis.plugins.js";

export async function setSinglePost(client = {},key,value,stringify = false){
    try{
        if(stringify){
            await client?.set(key,JSON.stringify(value))
        }else{
            await client?.set(key,value)
        }
    }catch(err){
        console.error(err)
    }
}


export async function getSinglePost(req,res,next,client){
    try{
        const client = new RedisPlugins().clients()
        const {id} = req.params;
        const data = await client.get(id)
        // console.log(data)
        if(data !== null){
            res.status(200).json({data: JSON.parse(data),error:false,message: "Successfully"})
        }else{
            next()
        }
        next()

    }catch(err){

        console.error(err)
        next();
    }
}


// export default class PostRedis{
//     constructor(props = {}) {
//         this.client = props?.client ?? null
//         this.config = {
//             ...props?.config,
//             key: props?.config?.key ?? null,
//             value: props?.config?.value ?? null,
//             parse: props?.config?.parse ?? false,
//             stringify: props?.config?.stringify ?? false
//         }
//     }
//     async getMyPost(req,res,next){
//         try{
//
//             if(typeof(this.client) !== "undefined" && this.client !== null){
//                 const {id} = req.params
//                 const data = await this?.client?.get(id)
//
//                 res.status(200).json(data)
//
//
//                 // if(id) {
//                 //     const data = await this?.client?.get(id)
//                 //     if (data) {
//                 //         if (this.config.parse) {
//                 //             res.status(200).json(JSON.parse(data))
//                 //         } else {
//                 //             res.status(200).json(data)
//                 //         }
//                 //     }
//                 // }
//             }else{
//                 next();
//             }
//         }catch(err){
//             console.error(err, "POST REDIS")
//             next();
//         }
//     }
//
//
//
//
//
//
//
//
//     setSinglePost(){
//         try{
//             if(this.client !== null){
//                 const key = this.config.key
//
//                 if(this.config.value !== null){
//                     this.client.set(key,JSON.stringify(this.config.value))
//                 }
//             }
//         }catch(err){
//             console.error(err?.message)
//         }
//     }
// }
