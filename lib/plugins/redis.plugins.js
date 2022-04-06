import redis from "redis";

export default class RedisPlugins {
    constructor(props = {}) {
        this.client = props
    }

    clients(){
        try{
            return redis.createClient({
                host: '127.0.0.1',
                port: 6379,
                enableOfflineQueue: false,
            })
            // return client
        }catch(err){

        }
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
}
