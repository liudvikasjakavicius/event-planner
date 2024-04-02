<template>
  <!-- Root Component -->
  <div class="root">

<!-- Event Details Section -->
    <section id="details" class="mt-4">
      <div class="container">
        <div class="row bg-silver">
          <div class="col-12 py-5">
         
            <!-- Displaying event details -->
            <h6 class="font-verdana">{{ this.currentEvent?.date }}</h6>
            <h1 class="font-verdana">{{ this.currentEvent?.title }}</h1>
            <h5 class="font-verdana">{{ this.currentEvent?.location }}</h5>
          </div> 
        </div>
      
        <!-- Event Overview Section -->
        <div class="row mt-4 px-md-5 py-3 bshadow">
          <div class="col-12 col-md-7 text-md-start text-center">
            <h2 class="font-verdana">Event Overview</h2>
            <p class="font-verdana">
              {{ this.currentEvent?.description }}
            </p>
          </div>
          <div class="col-12 col-md-5 d-md-flex align-items-md-center">         
       
            <!-- RSVP Button -->
            <button class="modal-button btn btn-sm btn-grey font-verdana btn-static" @click="openRsvpModal(1)">
  Mark Attending
</button>
</div>
        </div>

        <!-- Users Attending Section -->
        <div class="row mt-4 px-md-5 bshadow pt-3">
      <div class="col-12 col-md-6 text-md-start text-center">
        <h2 class="font-verdana">Users Attending</h2>
                    <!-- Displaying list of users attending the event -->
        <ul class="mt-3" v-if="currentEvent && currentEvent?.users.length">
          <li class="font-verdana" v-for="user in currentEvent?.users" :key="user.id">
            {{ user.id }}. {{ user.name }} - Print your ticket in the Ticket Generator. 
          </li>
        </ul>
          </div>
        </div>
      </div>
    </section>

   <!-- RSVP Modal Section -->
    <teleport to="body">
      <div class="modal" v-if="rsvpModal">
        <div>
          <div class="container header">
            <div class="row pt-2">
              <div class="col-11">
                <h5 class="font-verdana">{{ attending ? "Register" : "" }} yourself</h5>
              </div>
              <div class="col-1">
                <h6 class="font-bold cp font-verdana" @click="rsvpModal = false">x</h6>
              </div>
            </div>
          </div>
          <div class="body">
  <!-- RSVP Form -->
            <form @submit.prevent="submit">
              <input
                type="text"
                :placeholder="`Enter your name to ${
                  attending ? 'register' : 'unregister'
                }`"
                v-model="attendeeName"
                class="form-control mb-2 font-verdana"
              />
              <button
                :disabled="attendeeName.length < 2"
                class="btn btn-sm btn-dark font-verdana"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import CarouselSection from "../components/CarouselSection.vue";
import { toast } from "vue3-toastify";

  // Array of ticket numbers
const ticketNumbers = [
  "AB12CD", "XY89ZP", "3FG7HJ", "LM45NO", "PQ67RS",
  "8TU9VW", "WX23YZ", "4AB5CD", "EF67GH", "IJ89KL",
  "MN01OP", "QR23ST", "UV45WX", "6YZ7AB", "CD89EF",
  "GH01IJ", "KL23MN", "OP45QR", "ST67UV", "8WX9YZ",
  "AB01CD", "EF23FG", "HI45JK", "LM67NO", "PQ89RS",
  "0TU1VW", "XY23YZ", "4CD5EF", "GH67IJ", "KL89MN",
  "NO01OP", "QR23ST", "6UV7WX", "YZ89AB", "2CD3EF",
  "4GH5IJ", "6KL7MN", "OP89PQ", "RS01ST", "UV23UV",
  "WX45WX", "YZ67YZ", "8AB9CD", "EF01EF", "GH23GH",
  "IJ45IJ", "KL67KL", "MN89MN", "OP01OP", "QR23QR",
  "ST45ST", "UV67UV", "WX89WX"
];

export default {
  name: "Home",
  components: {
    CarouselSection,
  },

  data() {
    return {
      rsvpModal: false,
      attendeeName: "",
      currentEvent: null,
      toastCount: 0,
      attendeeRemoval: false,
      attending: false,
      ticketIndex: 0,
    };
  },
  
  watch: {
    attendeeName: {
      handler(newValue) {
        if (!newValue || newValue != this.attendeeToRemove) {
          this.attendeeRemoval = false;
        }
      },
    },
  },

  methods: {
    getEventDetails() {
      this.currentEvent = this.$store.state.currentEvent;
    },

    openRsvpModal(value) {
      this.rsvpModal = true;
      if (value == 1) {
        this.attending = true;
      }
    },
 
    markRsvp() {
      const obj = {
        id: this.currentEvent?.id,
        name: this.attendeeName,
      };

  // Generate a random ticket number 
  const ticketNumber = ticketNumbers[this.ticketIndex]; 
  
  // Add the ticket number to the attendee object
  obj.ticketNumber = ticketNumber;

  this.$store.commit("updateEventAttendee", obj);
  const err = this.$store.state.error;
  if (!err) { 
    
    // Display success message with the ticket number
    toast.success(`Registered Successfully! Copy your ticket number to print it in the Ticket Generator section: ${ticketNumber}`, {
      autoClose: false, // Adjust the duration as needed
    });
    setTimeout(() => {
      this.$router.push({ path: "details" });
    }, 50000000000000000); // Adjust the duration as needed
    this.rsvpModal = false;
  } else {
    toast.error(err, {
      autoClose: 50000000000000000,
    });
  }
},
    
    submit() {
      if (!this.attending) {
      } else {
        this.markRsvp();
      }
    },
  },

  mounted() {
    this.getEventDetails();
  },
};
</script>
<br>

// CSS / Style 

<style scoped>

.btn-grey {
  background-color: #666;
  color: #fff; /* Text color */
}

.btn-static {
  background-color: #666 !important;
  color: #fff !important; /* Text color */
  border-color: #666 !important; /* Border color */
}

.btn-static:hover,
.btn-static:focus,
.btn-static:active {
  background-color: #666 !important;
  color: #fff !important; /* Text color */
  border-color: #666 !important; /* Border color */
}




.ul li {
  list-style-type: none;
  text-transform: capitalize; /* Add this line to capitalize the first letter */
}

.root {
  position: relative;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #686767ab;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  /* z-index: 999;*/
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
}

.font-verdana {
  font-family: Verdana, sans-serif;
}


.modal .header {
  background-color: #bbbbbbab;
}

.modal div .body {
  padding: 1rem;
}

.bshadow {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.cp {
  cursor: pointer;
}



@media (max-width: 767px) {
  .modal > div {
    width: 100%;
  }
}
</style>