  const form = document.getElementById('signupForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch('/api/auth/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (response.ok) {
        // Signup successful, redirect to another page or update the UI
        window.location.href = '/login'; // Example: redirect to login page
      } else {
        // Signup failed, display error message
        response.json().then(data => {
          alert(data.error); 
        });
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
    });
  });
