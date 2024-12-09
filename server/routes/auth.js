import passport from 'passport';
import { Router } from 'express';
import authController from '../controllers/authController.js'
const router = Router(); 

router.post(
  "/api/auth/register",
  authController.createNewUser
)

router.post(
  "/api/auth/login",
  passport.authenticate("local"),  
  (req, res) =>{
    res.sendStatus(200)
  }
);

router.get('/login', (req, res) => {
  res.render('login'); // Render the login form
});

router.get('/register', (req, res) => {
  res.render('register'); // Render the register form
});

router.post(
  '/login', 
  passport.authenticate('local', { 
    successRedirect: '/',    // Redirect to home page on success
    failureRedirect: '/login', // Redirect back to login on failure
    failureFlash: true       // Enable flash messages for error handling
  })
);
router.get('/logout', (req, res, next) => {
  req.logout((err) => { // Passport.js method for logging out
    if (err) { return next(err); }
    res.redirect('/login'); // Redirect to login page after logout
  });
});
router.get(
  '/api/auth/status', 
  (req, res) =>{
  return req.user ? res.send(req.user) : res.sendStatus(401)
})

router.post(
  "/api/auth/logout",
  (req, res) =>{
  if (!request.user) return response.sendStatus(401);
	request.logout((err) => {
		if (err) return response.sendStatus(400);
		response.send(200);
	});
  }
);


export default router;
