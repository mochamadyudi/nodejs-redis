import { Router } from 'express'
const route = Router();
export default (app,redis)=> {
    app.use('/post',route)

    route.get('/single/', (req,res)=> {
        res.json({message: "Success"}).status(200)
    })

    return app

}
