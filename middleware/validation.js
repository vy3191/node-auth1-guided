const bcrypt = require('bcryptjs');
const userModal = require('../users/users-model');
const session = {};

async function validation(req,res,next) {
   // console.log('token', req.headers)
   try{
    //  const {username, password} = req.headers;
    //  const user = await userModal.findBy({username}).first();
    //    console.log(req.header);
    //  if(!username) res.status(401).json({msg:'User name is missing'});
    //  if(!password) res.status(401).json({msg:'Password is missing'});
    //  if(!user) res.status(401).json({msg:'User does not exis'});

    //  const isPasswordValid = await bcrypt.compare(password, user.password);
     
    //  if(!isPasswordValid) res.status(403).json({msg:'Wrong credentials-please correct credentials'});
   //  const {authorization} = req.headers;
   //  if(!session[authorization]) {
   //     return res.status(401).json({msg:'Wrong credentials'});
   //  }
  //  const { cookie } = req.headers;
  //  if(!cookie) res.status(401).json({msg:'No authorized'});

  //  const authToken = cookie.replace("token=",'');
  //  if(!session[authToken]) res.status(401).json({msg:'Not authorized now.'});

     if(!req.session || !req.session.user) res.status(401).json({msg:'Not authorized'});
     next();
   }catch(err){
     next(err);
   }
}

module.exports = {session,validation};