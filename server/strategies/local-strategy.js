import passport from 'passport';
import { Strategy } from 'passport-local';
import authController from '../controllers/authController.js'
import { comparePassword } from '../utils/helpers.js'
passport.serializeUser((user, done)=>{
  console.log(`Inside Serialize user: ${user}`)
  done(null, user.user_id) 
})

passport.deserializeUser( async (user, done)=>{ 
  try{
    console.log(`Inside Deserialize user: ${user}`)
    console.log(user)
    const findUser = await authController.findUserByID(user); 
    if(!findUser) throw new Error('User Not Found')
    done(null, findUser)
  } catch(err){
    done(err, null);
  }
})

export default passport.use(
    new Strategy({usernameField: "email"},async (email, password, done)=>{
      try {  
        const findUser = await authController.findUser(email); 
        if(!findUser) throw new Error('User Not Found')
        if(!comparePassword(password, findUser.password)) throw new Error('Incorrect Password')
        done(null, findUser)
      } catch (err) {
        done(err, null) 
      }
    }
  )
)
