<template>
  <div class="contact-us">
    <br>
    <br>
    <br>
    <div class="contact-us-text">
      <h2 style="font-family: Verdana, sans-serif; font-weight: bold;">CONTACT US:</h2>
    </div>
  </div>
  <div class="contact-us">
    <!-- Your existing form code goes here -->
    <br>
    <br>
    <br>
   
    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="form.phone" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" rows="5" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  <br>
  <br>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        message: ''
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('https://submit-form.com/XA4VHTcgh', {
          name: this.form.name,
          phone: this.form.phone,
          email: this.form.email,
          message: this.form.message
        }, {
          headers: {
            'Authorization': 'Bearer form_v1_q9X0fkKuYAKOfM3fdh7Pprxv',
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        alert('Form submitted successfully.');
        this.resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
        alert('There was a problem submitting your form.');
      }
    },
    resetForm() {
      this.form.name = '';
      this.form.phone = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
}
</script>

<style scoped>
.contact-us {
  text-align: center;
}

.contact-us h1 strong {
  font-family: Verdana, sans-serif;
  font-weight: bold;
}

.contact-form {
  max-width: 400px;
  margin: 0 auto;
}

.contact-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.contact-form label {
  font-family: Verdana, sans-serif;
  color: #333;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Verdana, sans-serif;
}

.contact-form button {
  width: 100%;
  padding: 10px;
  background-color: #666;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: Verdana, sans-serif;
}

.contact-form button:hover {
  background-color: #555;
}
</style>
