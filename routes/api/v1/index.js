import {Router} from "express";
import auth from "./auth/index.js";
import post from "./post/index.js";

export default function APiRoutes(redis){
    const app = Router()

    auth(app)
    post(app,redis)

    return app
}
