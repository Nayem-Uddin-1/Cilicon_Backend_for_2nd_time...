
function authMiddelware(req,res,next){

   if(req.session.user){
    

         next()

   }else{

       return res.status(400).json({success:false , message:"unauthorize"})

   }
    


}




module.exports = authMiddelware