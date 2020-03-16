const bcrypt = require('bcryptjs');
const userModal = require('../users/users-model');
const session = {};

async function validation(req,res,next) {
   try{
     const {username, password} = req.headers;
     const user = await userModal.findBy({username}).first();
       console.log(req.header);
     if(!username) res.status(401).json({msg:'User name is missing'});
     if(!password) res.status(401).json({msg:'Password is missing'});
     if(!user) res.status(401).json({msg:'User does not exis'});

     const isPasswordValid = await bcrypt.compare(password, user.password);
     
     if(!isPasswordValid) res.status(403).json({msg:'Wrong credentials-please correct credentials'});
     next();
   }catch(err){
     next(err);
   }
}

module.exports = {session,validation};