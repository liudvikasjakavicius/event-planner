<template>
  <br>
  <div class="container">
    <!-- Form for generating tickets -->
    <div class="form-container">
      <h2 style="font-family: Verdana;">Get your Ticket</h2>
      <!-- Form submission triggers generateTicket method -->
      <form @submit.prevent="generateTicket">
        <div class="form-group">
          <label for="name" style="font-family: Verdana;">Name:</label>
          <!-- Input for name -->
          <input type="text" id="name" v-model="name" required style="font-family: Verdana;">
        </div>
        <div class="form-group">
          <label for="Email" style="font-family: Verdana;">Email:</label>
          <!-- Input for email -->
          <input type="email" id="email" v-model="email" required style="font-family: Verdana;">
        </div>
        <div class="form-group">
          <label for="ticket-number" style="font-family: Verdana;">Ticket Number:</label>
          <!-- Input for ticket number -->
          <input type="text" id="ticketNumber" v-model="ticketNumber" required style="font-family: Verdana;">
        </div>
        <!-- Button to submit form -->
        <button type="submit" style="font-family: Verdana;">Generate Ticket</button>
      </form>
    </div>

    <!-- Button to download PDF -->
    <button @click="downloadPDF" v-if="generatedPDF" style="font-family: Verdana;">Download PDF</button>
    <!-- Placeholder for PDF preview -->
    <div v-if="pdfPreview" ref="pdfPreview"></div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      // Data properties for form inputs
      name: '',
      email: '',
      ticketNumber: '',
      // Placeholder for generated PDF
      generatedPDF: null,
      // Placeholder for PDF preview
      pdfPreview: null,
      // Array of allowed ticket numbers
      allowedTicketNumbers: ['AB12CD', 'XY89ZP', '3FG7HJ', 'LM45NO', '8TU9VW', 'WX23YZ', '4AB5CD', 'EF67GH', 'IJ89KL', 'MN01OP', 'QR23ST', 'UV45WX', '6YZ7AB', 'CD89EF', 'GH01IJ', 'KL23MN', 'OP45QR', 'ST67UV', '8WX9YZ', 'AB01CD', 'EF23FG', 'HI45JK', 'LM67NO', 'PQ89RS', '0TU1VW', 'XY23YZ', '4CD5EF', 'GH67IJ', 'KL89MN', 'NO01OP', 'QR23ST', '6UV7WX', 'YZ89AB', '2CD3EF', '4GH5IJ', '6KL7MN', 'OP89PQ', 'RS01ST', 'UV23UV', 'WX45WX', 'YZ67YZ', '8AB9CD', 'EF01EF', 'GH23GH', 'IJ45IJ', 'KL67KL', 'MN89MN', 'OP01OP', 'QR23QR', 'ST45ST', 'UV67UV', 'WX89WX'],
      // Array of printed ticket numbers
      printedTicketNumbers: []
    };
  },
  methods: {
    generateTicket() {
      // Log allowed and printed ticket numbers
      console.log('Allowed Ticket Numbers:', this.allowedTicketNumbers);
      console.log('Printed Ticket Numbers:', this.printedTicketNumbers);

      // Check if entered ticket number is valid
      if (this.allowedTicketNumbers.includes(this.ticketNumber)) {
        console.log('Valid ticket number entered:', this.ticketNumber);
        // Check if ticket number has already been printed
        if (!this.printedTicketNumbers.includes(this.ticketNumber)) {
          console.log('Ticket number not printed yet. Generating PDF...');
          // Create new jsPDF instance
          const pdf = new jsPDF();
          // Add ticket details and additional text to PDF
          pdf.text(20, 20, `Name: ${this.name}`);
          pdf.text(20, 30, `Email: ${this.email}`);
          pdf.text(20, 40, `Ticket Number: ${this.ticketNumber}`);
          pdf.text(20, 50, `Thank you for gracing us with your presence on this special occasion.`);
          pdf.text(20, 60, `For more information about the event:`);
          pdf.text(20, 70, `info@jakavicius.org`);
          // Convert PDF to data URI string
          this.generatedPDF = pdf.output('datauristring');
          // Add printed ticket number to array
          this.printedTicketNumbers.push(this.ticketNumber);
          console.log('PDF generated successfully.');
        } else {
          // Alert if ticket number is already printed
          alert('Ticket number already printed.');
          console.log('Ticket number already printed.');
        }
      } else {
        // Alert if invalid ticket number is entered
        alert('Invalid ticket number. Please enter a valid ticket number.');
        console.log('Invalid ticket number entered:', this.ticketNumber);
      }
    },
    downloadPDF() {
      // Create a link element to download PDF
      const link = document.createElement('a');
      link.href = this.generatedPDF;
      link.download = 'ticket.pdf';
      // Trigger click event to download PDF
      link.click();
    }
  }
};
</script>

<style scoped>
/* Add your custom styles CSS*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Adjust as needed */
}

.form-container {
  border: 2px solid #ccc;
  padding: 20px; /* Adjust padding to make the box larger */
  background-color: #f7f7f7;
  width: 60%; /* Adjust width to make the box larger */
  max-width: 800px; /* Set a maximum width */
  margin: auto; /* Center the box horizontally */
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Adjust vertical spacing between form groups */
}

label {
  width: 150px; /* Adjust width of labels to make them consistent */
  text-align: right; /* Align labels to the right */
  margin-right: 10px; /* Add margin for spacing between label and input */
}

input {
  flex: 1; /* Take up remaining space */
}

button[type="submit"],
button[type="button"] {
  background-color: #666;
  color: white;
}

/* Right-align the text of labels */
label {
  text-align: right;
}
</style>
