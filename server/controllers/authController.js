import authModel from '../models/auth.js'
import userModel from '../models/user.js'
import { hashPassword } from '../utils/helpers.js'
const createNewUser = async (req, res) =>{
    try {
      let {email, username, password, first_name, last_name, location} = req.body;
      if (!email && !username && !password) {return res.status(400).json({error: "Please fill in all the fields"})
      }
      const [existingUsername, existingEmail] = await Promise.all([
        userModel.getUserByUsername(username),
        userModel.getUserByEmail(email)
      ])
      if (existingUsername) return res.status(409).json({error: "username already taken"})
      if (existingEmail) return res.status(409).json({error: "email already taken"})

      password = hashPassword(password)
      const newUser = await authModel.createNewUser(
        email, 
        username, 
        first_name, 
        last_name, 
        password, 
        location
      )
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err)
      res.status(500).json({error: 'Failed to register user'})
    }
  } 

const findUser = async (email) => {
  try{
    const user = await authModel.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch(err) {
    console.log(err)
  }
}
const findUserByID = async (id) => {
  try{
    const user = await authModel.getUserByID(id);
    return user[0];
  } catch (error){
    console.log(error)
  }
}
export default {
  createNewUser,
  findUser,
  findUserByID
}
