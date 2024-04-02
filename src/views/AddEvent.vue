<template>
  <div class="root">
        <!-- Details section -->
    <section id="details" class="mt-4">
      <div class="container">
        <div class="row">

          <div class="col-12 text-center mb-4">
  <p style="font-family: Verdana, sans-serif;">Warning: <br> This page is reserved for the Event Organizer.</p>
</div>

          <!-- Password Entry Section -->
          <div v-if="!passwordEntered" class="col-12 col-md-4 border offset-md-4 py-3 bshadow password-box">
            <h4 class="font-verdana">Password Required</h4>
                        <!-- Password Form -->
            <form class="mt-3" @submit.prevent="submitPassword">
              <input type="password" placeholder="Enter Password" v-model="password" class="form-control mb-2 font-verdana" />
              <button class="w-100 btn btn-sm btn-grey font-verdana btn-static">Submit</button>
              <p v-if="incorrectPassword" class="error font-verdana">Incorrect password</p>
            </form>
          </div>

          <!-- New Event Form -->
          <div v-else class="col-12 col-md-4 border offset-md-4 py-3 bshadow">
            <h4 class="font-verdana">Add Event Details</h4>
            <form class="mt-3" @submit.prevent="addEvent">
              <input type="text" placeholder="Event Title" v-model="eventData.title" class="form-control mb-2 font-verdana" />
              <textarea placeholder="Event Description" v-model="eventData.description" class="form-control mb-2 font-verdana"></textarea>
              <input type="text" placeholder="Event Location" v-model="eventData.location" class="form-control mb-2 font-verdana" />
              <a class="w-100 mb-2 btn btn-sm" style="background-color: #666; color: #fff; border-color: #666; font-family: Verdana, sans-serif;" @click="toggleDate">Select Date & Time and Press Here to Record</a>
              <VDatePicker v-if="datePicker" v-model="date" mode="dateTime" is24hr />
              <button class="w-100 btn btn-sm btn-grey font-verdana btn-static">Submit</button>
              <p v-if="!isValidForm && hasSubmitted" class="error font-verdana">Please provide valid data</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


/* Styling for the password entry box */
<style scoped>
  .password-box {
    margin-top: 20px; /* Adjust this value as needed */
  }
</style>
<script>
import { toast } from "vue3-toastify";

export default {
  name: "Add Event",
  data() {
    return {
      password: "",
      passwordEntered: false,
      incorrectPassword: false,
      date: new Date(),
      datePicker: false,
      eventData: {
        id: null,
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        users: [],
      },      
      isValidForm: true,
      hasSubmitted: false,
      hasErr: false
    };
  },

  // Toggle the visibility of the date picker
  methods: {
    toggleDate() {
      this.datePicker = !this.datePicker;
      setTimeout(() => {
        const dpickercls = document.getElementsByClassName("vc-container")[0];
        if (dpickercls) {
          dpickercls.style.position = "absolute";
          dpickercls.style.zIndex = "99";
          dpickercls.style.left = "50%";
          dpickercls.style.transform = "translateX(-50%)";
        }
      }, 0);
    },

   // Add event to the store and handle form validation
    addEvent() {
      this.hasSubmitted = true
      //get time
      let dateTime = this.date;
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      // let seconds = dateTime.getSeconds();

      //get date
      let offset = dateTime.getTimezoneOffset();
      dateTime = new Date(dateTime.getTime() - offset * 60 * 1000);
      this.eventData.id = this.$store.state.events.length + 1;
      this.eventData.date = dateTime.toISOString().split("T")[0];
      this.eventData.time =
        hours +
        ":" +
        ((minutes + "").length == 1 ? "0" + minutes : minutes) +
        (hours >= 12 ? "PM" : "AM");

      const errs = []
      //check if valid form data
      Object.keys(this.eventData).forEach((key) => {
        if (
          key == "title" ||
          key == "description" ||
          key == "date" ||
          key == "time" ||
          key == "location"
        ) {
          console.log(key, this.eventData[key])
          if (!this.eventData[key]) {
            errs.push(0)
          }
        }
      });
      if(errs.includes(0)){
        this.isValidForm = false
      }
      else{
        this.isValidForm = true
      }
      console.log('is form valid', this.isValidForm, this.eventData)
      if (this.isValidForm) {
        this.$store.commit("addEvent", this.eventData);

        const err = this.$store.state.error;
        if (!err) {
          toast.success("Event Added Successfully", {
            autoClose: 3000,
          });
          setTimeout(() => {
            this.$router.push({ path: "events/" });
          }, 3000);
        } else {
          toast.success(err, {
            autoClose: 3000,
          });
        }
      }
    },

    submitPassword() {
      if (this.password === "rolex800") {
        this.passwordEntered = true;
      } else {
        this.incorrectPassword = true;
      }
    },
  },
};
</script>

<!-- CSS Styling -->

<style scoped>

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
  width: 40%;
  background-color: #fff;
  border-radius: 10px;
}

.modal .header {
  background-color: #bbbbbbab;
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

.modal div .body {
  padding: 1rem;
}

.bshadow {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.vc-container {
  position: absolute !important;
}
.error{
  color: red;
}

@media (max-width: 767px) {
  .modal > div {
    width: 100%;
  }
}

.font-verdana {
  font-family: Verdana;
}
</style>