export default class AuthController{
    signUp(req,res){
        try{
            res.json({message: null}).status(200)
        }catch(err){
            res.json({message: err?.message}).status(500)
        }
    }
}
