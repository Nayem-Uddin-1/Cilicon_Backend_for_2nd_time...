
function adminMiddelware(req,res,next){

  if(req.session.user.role==="admin"){
    next()
  }else{
    res.status(401).json({success: false, messege: "only admin can access"})
  }
  
    

}


module.exports = adminMiddelware