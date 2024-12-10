const form = document.getElementById('questionForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch('/api/posts/create', { // Replace with your actual endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (response.ok) {
        // Handle success (e.g., redirect, display message)
        console.log('Question submitted successfully!');
        window.location.href = "http://localhost:3000/"
      } else {
        // Handle error (e.g., display error message)
        console.error('Failed to submit question');
      }
    })
    .catch(error => {
      console.error('Error during question submission:', error);
    });
  });
