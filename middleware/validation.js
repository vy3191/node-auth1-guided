const bcrypt = require('bcryptjs');
const userModal = require('../users/users-model');

async function validation(req,res,next) {
   try{
     const user = userModal.findBy({username}).first();
     const {username, password} = req.headers;

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

module.exports = validation;