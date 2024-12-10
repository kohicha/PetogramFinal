const form = document.getElementById('shelter-form'); // Select the form

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  fetch('/shelter-registration', { // Replace with your actual endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
  .then(response => {
    if (response.ok) {
      // Handle success (e.g., redirect, display message)
      console.log('Shelter registration submitted successfully!');
    } else {
      // Handle error (e.g., display error message)
      console.error('Failed to submit shelter registration');
    }
  })
  .catch(error => {
    console.error('Error during shelter registration submission:', error);
  });
});
