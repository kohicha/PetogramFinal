  const form = document.getElementById('loginForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch('/api/auth/login', { // Send to your login endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData) 
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/'; 
      } else {
        // Handle login error (e.g., display error message)
        console.error('Login failed');
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
    });
  });
