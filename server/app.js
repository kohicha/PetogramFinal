//imports

import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import "./strategies/local-strategy.js";
import { fileURLToPath } from 'url';
import db from './db/connection.js'
import routes from './routes/index.js';
import userController from './controllers/userController.js'
import {ensureAuthenticated, checkRole} from './utils/middleware.js'
import flash from 'connect-flash'; 

//constants
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(flash());
app.use(express.static(path.join(__dirname, '../client/public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../client/views'));
app.use(express.json());
app.use(cookieParser("Petogram"));
app.use(
  session({
    secret: "petogod",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60
    }
  })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use((req, res, next) => {
  res.locals.user = req.user; 
  next();
});

app.get('/', async (req, res) => {
  try {
    const getPosts = await fetch('http://localhost:3000/api/posts');
    const posts = await getPosts.json();

    const postPromises = posts.map(async (post) => { 
      const getAuthor = await fetch(`http://localhost:3000/api/users/${post.user_id}`);
      const author = await getAuthor.json();
      return { ...post, username: author.username, role: author.role}; 
    });

    const updatedPosts = await Promise.all(postPromises); 
    res.render('home', { page: 'home', posts: updatedPosts});
  } catch (error) {
    console.log('Error fetching posts: ', error);
    res.status(500).render('error', { error: 'Failed to fetch posts' });
  }
});
app.get('/favorites', ensureAuthenticated,async (req, res) => {
  try{
    const user_id = req.user.user_id
    const getFavorites = await fetch(`http://localhost:3000/api/${user_id}/favorites`)
    const favorites = await getFavorites.json();
    const postPromises = favorites.map(async (favorite) => { 
      const getAuthor = await fetch(`http://localhost:3000/api/users/${favorite.user_id}`);
      const author = await getAuthor.json();
      return { ...favorite, username: author.username, role: author.role}; 
    });
    const updatedPosts = await Promise.all(postPromises); 
    res.render('favorites', { page: 'favorites', favorites: updatedPosts})
  } catch(error){
    console.log(error)
  }
})

app.get('/post/:post_id', async(req, res) => {
  try{
    const post_id = req.params.post_id;
    const getPost = await fetch(`http://localhost:3000/api/posts/post/${post_id}`)
    const post = await getPost.json()

    const getAuthor = await fetch(`http://localhost:3000/api/users/${post.user_id}`);
    const author = await getAuthor.json();
    res.render('post', {page: 'post', post, author})
  } catch(error){
    console.log('Errot fetching post: ',error)
    res.status(500)
  }
})


app.get('/ask', ensureAuthenticated,(req, res)=>{
  res.render('question', { page: 'ask'})
})

app.get('/not-found', (req, res) => {
  res.render('not-found', { page: 'not-foumd'})
})

app.get('/error', (req, res) => {
  res.render('error', { page: 'not-foumd'})
})

app.get('/shelters', (req, res) => {
  res.render('shelters', { page: 'shelters' })
})

app.get('/shelters/shelter', (req, res) => {
  res.render('shelter', { page: 'shelters' })
})

app.get('/shelters/shelter-registration', (req, res) => {
  res.render('shelter-registration', { page: 'shelters' })
})

app.get('/profile/expert-registration', (req, res) => {
  res.render('expert-registration', { page: 'settings' })
})

app.get('/verify', (req, res) => {
  res.render('verify-page', {page: 'verify'})
})


app.get('/community', (req, res) => {
  res.render('community', { page: 'community' })
})

app.get('/profile/settings', ensureAuthenticated,async (req, res) => {
  try{
    const user_id = req.user.user_id
    const getUser = await fetch(`http://localhost:3000/api/users/${user_id}`);
    const user = await getUser.json()
    console.log(user)
  res.render('profile-settings', { page: 'settings', user })
  }catch (error){
    console.log(error)
  }
})


app.get('/admin', async (req, res) => {
  try {
    const getUsers = await fetch('http://localhost:3000/api/users')
    const users = await getUsers.json()
    console.log(users)
    res.render('superuser', { page: 'settings', users})
  } catch(error){
    console.log(error)
  }
})

app.get('/profile/:username', async(req,res) => {
  try {
    const respo = await fetch('http://localhost:3000/api/posts')
    const posts = await respo.json();
    const username = req.params.username;
    const response = await fetch(`http://localhost:3000/api/user/${username}`)
    const user_profile = response.json()
    res.render('profile', { page: 'user', user_profile, posts}) 
  } catch(error){
    console.log(error)
    res.status(500)
  }
})



app.get('/admin/shelter-verification', checkRole('administrator'),async(req,res) => {
  try{
    const pendingShelters = await fetch("http://localhost:3000/pending")
    const shelters = await pendingShelters.json()

    console.log(shelters)
    res.render('shelter-admin', {shelters})
  }catch (error){
    console.log(error)
    res.status(500)
  } 
})

app.get('/admin/expert-verification', checkRole('administrator'),async(req,res) => {
  res.render('expert-admin', {experts : []})
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render('error', { error: err , page:'err`'}); // Render an error page
});

app.use((req, res) => {
  res.status(404).render('404', {page:'404'}); // Render a 404 page
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
