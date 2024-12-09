const savePostButton = document.getElementById('savePostButton');

savePostButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission if it's in a form

  const postId = savePostButton.dataset.postId;
  
  try {
    const response = await fetch(`/api/users/favorites/${postId}`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      console.log('Post added to favorites!');
    } else {
      const data = await response.json();
      console.error('Failed to add post to favorites:', data.error);
    }
  } catch (error) {
    console.error('Error adding post to favorites:', error);
  }
});
