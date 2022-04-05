export default function(req,res,next){
    try{
        const {username} = req.params;

        client.get(username,(err,data)=> {
            if(err) throw err;
            if(data!==null){
                res.status(200).json({...data,username});
            }else{
                next();
            }
        })

    }catch(err){
        throw err;
    }
}
