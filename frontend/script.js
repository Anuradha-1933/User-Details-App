document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phone: this.phone.value,
      email: this.email.value,
      address: this.address.value
    };
  
    const res = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  
    const result = await res.json();
    document.getElementById('message').innerText = result.message;
  });
  