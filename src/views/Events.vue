<template>
  <!-- Events section -->
  <br>
  <section id="events" class="mt-4">
    <div class="container">
      <!-- Events title -->
      <div class="row mb-3">
        <div class="col-12 py-2 bg-dark">
          <h4 class="mb-0 text-light" style="font-family: Verdana;">Events</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- List of events -->
          <ul class="ps-0" v-if="events.length">
            <!-- Iterate through each event -->
            <li class="mb-2" v-for="e in events" :key="e.id" >
              <!-- Event details row -->
              <div class="row events">
                <!-- Left column for event date and time -->
                <div class="col col-4 p-3 text-light">
                  <!-- Event date -->
                  <h1 class="date mb-0">{{(e.date).slice(-2)}}</h1>
                  <!-- Event month -->
                  <h4 class="mb-3">{{getMonthName(e.date)}}</h4>
                  <!-- Event time -->
                  <h5>{{e.time}}</h5>
                </div>
                <!-- Right column for event information -->
                <div class="col col-8 p-3 bg-silver">
                  <!-- Event title -->
                  <h4 class="mb-0">{{e.title}}</h4>
                  <!-- Event description -->
                  <p class="mb-0">{{e.description.length > 30 ? e.description.slice(0, 30 - 1) + "…" : e.description}} </p>
                  <!-- Event location -->
                  <p class="mb-0">{{e.location}}</p>
                  <!-- Number of attendees -->
                  <p>Total Attending: {{e.users.length}}</p>
                  <!-- Button to view event details -->
                  <button class="view-details-btn" @click="viewDetails(e.id)">
                    View Details
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <!-- Display if no events -->
          <p v-else class="font-verdana">No current events</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // Array to store events data
      events: [],
    };
  },
  methods: {
    // Method to navigate to event details
    viewDetails(eventId){
      this.$store.commit('selectedEvent', eventId)
      this.$router.push({ path: '../details' })  
    },
    // Method to fetch and sort events data
    getEvents(){
      // Fetch events data from Vuex store
      console.log(this.$store.getters.getEvents, 'all stored events')
      if(this.$store.getters.getEvents.length){
        // Copy events array from store and sort by date
        this.events = [...this.$store.getters.getEvents]
        this.events.sort(function(a, b) {
          var c = new Date(a.date);
          var d = new Date(b.date);
          return c-d;
        });
      }
    },
    // Method to get month name from date string
    getMonthName(date) {
      const monthNumber = date.slice(4,7)
      const d = new Date();
      d.setMonth(monthNumber - 1);
      return d.toLocaleString('en-US', { month: 'long' });
    }
  },
  mounted(){
    // Fetch events data on component mount
    this.getEvents()
  }
};
</script>

<style scoped>

.font-verdana {
  font-family: Verdana;
}

/* Styling for "View Details" button */
.view-details-btn {
  background-color: #666;
  color: #fff; /* Text color */
}

.view-details-btn:hover {
  background-color: #666; /* Set the background color to grey on hover */
  color: #fff; /* Set the text color to white on hover */
}

.view-details-btn:active,
.view-details-btn:focus {
  background-color: #666; /* Set the background color to grey when clicked or focused */
  color: #fff; /* Set the text color to white when clicked or focused */
}

/* Styling for alternating row colors */
ul li:nth-child(odd) .row .col {
  background-color:#333;
}
ul li:nth-child(even) .row .col {
  background-color:#726f72;
}
/* Styling for event date */
.date {
  font-size: 4rem;
  font-weight: bold;
  font-family: Verdana;
}
/* Styling for event details */
.events .col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
/* Font family for event text */
.events h4, .events h5, .events p, .events button {
  font-family: Verdana;
}
</style>
