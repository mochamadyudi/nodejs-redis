import{ Router } from 'express'
import AuthController from "../../../../app/controller/auth.controller.js";

const route = Router();
export default (app)=> {
    app.use('/auth',route)

    route.get('/signup', new AuthController().signUp)
    return app
}
