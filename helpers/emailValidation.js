function emailValidation(email){

  const validation =  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 

  return validation

}





module.exports =emailValidation