import postModel from '../models/post.js'

const getPosts = async (req, res) =>{
  try {
    const posts = await postModel.getPosts();
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to get posts.'})
  }
}

const getPost = async (req, res) =>{
  try {
    const post_id = req.params.post_id
    const posts = await postModel.getPost(post_id);
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to get posts.'})
  }
}

const getUserPosts = async (req, res) => {
  try {
    
    const user_id = req.params.user_id
    
    const posts = await postModel.getUserPosts(user_id);
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Failed to get user posts.'})
  }
}

const createNewPost = async (req, res) => {
  try{
    const user_id = req.user.user_id
    const {title, body} = req.body
    console.log(user_id)
    const newPost = await postModel.createNewPost(title, body, user_id)
    res.status(201).json(newPost)
  } catch(error){
    console.log('Error creating post:', error)
    res.status(500).json({errot: 'Failed to create post'})
  }
}

const getUserFavorites = async (req,res) => {
  try{
    const user_id = req.params.user_id
    console.log(user_id)
    const getFavorites = await postModel.getUserFavorites(user_id);
    res.json(getFavorites)
  } catch (error){
    console.log(error)
    res.status(500).json({error: 'Failed to get favorites'})
  }
}

const createShelterRegistrationForm = async (req, res) => {
  try {
    const userId = req.user.user_id; // Assuming you have authentication middleware
    const {
      shelter_license,
      shelter_registration,
      owner,
      name,
      address,
      google_maps_link,
      description,
      email,
      phone,
      website,
      open_hours,
      close_hours,
    } = req.body;

    const newForm = await postModel.createShelterRegistrationForm(
      userId,
      shelter_license,
      shelter_registration,
      owner,
      name,
      address,
      google_maps_link,
      description,
      email,
      phone,
      website,
      open_hours,
      close_hours
    );

    res.status(201).json(newForm); // Or redirect to a success page
  } catch (error) {
    console.error("Error creating shelter registration form:", error);
    res.status(500).json({ error: "Failed to create registration form" });
  }
};
const getPendingShelterRegistrations = async (req, res) => {
  try {
    const shelters = await postModel.getPendingShelterRegistrations();
    res.json(shelters);
  } catch (error) {
    console.error('Error getting pending shelter registrations:', error);
    res.status(500).json({ error: 'Failed to fetch pending shelter registrations' });
  }
};

const acceptShelterRegistration = async (req, res) => {
  try {
    const shelterId = req.params.shelter_id;

    // Fetch the shelter registration data
    const registration = await postModel.getShelterRegistrationById(shelterId);
    if (!registration) {
      return res.status(404).json({ error: 'Shelter registration not found' });
    }

    // Create the shelter using the registration data
    const newShelter = await postModel.createShelter(
      registration.owner,
      registration.name,
      registration.address,
      registration.google_maps_link,
      registration.description,
      registration.email,
      registration.phone,
      registration.website,
      registration.open_hours,
      registration.close_hours
    );

    res.json(newShelter);
  } catch (error) {
    console.error('Error accepting shelter registration:', error);
    res.status(500).json({ error: 'Failed to accept shelter registration' });
  }
};
const getShelterRegistrationById = async (shelterFormId) => {
  try {
    const result = await db.query(
      'SELECT * FROM shelter_registration_form WHERE shelter_form_id = $1',
      [shelterFormId]
    );
    return result.rows[0]; // Return the first row (if found)
  } catch (error) {
    console.error('Error getting shelter registration by ID:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default {
  getPosts,
  getPost,
  getUserPosts,
  getUserFavorites,
  createNewPost,
  createShelterRegistrationForm,
  getPendingShelterRegistrations,
  acceptShelterRegistration,
  getShelterRegistrationById
}

