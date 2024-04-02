<template>
    <!-- Header section -->
  <header>
    <div class="container-fluid">
      <div class="row bg-custom">
        <div class="col-md-12">
          <nav class="navbar navbar-expand-sm navbar-light">
            <div class="container-fluid">
                            <!-- Brand logo -->
              <a class="navbar-brand">
                <img src="./assets/logo.png" class="img-fluid logo" alt="" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavbar"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
                            <!-- Navbar links  / menu -->
              <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                                    <!-- Router links (menu) -->
                  <li class="nav-item">
                    <router-link class="nav-link" to="/home" v-bind:class="{ active: currentRouteName === 'Home' }">Home</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/about" v-bind:class="{ active: currentRouteName === 'About' }">About</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/add-event" v-bind:class="{ active: currentRouteName === 'AddEvent' }">Add Event</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/events" v-bind:class="{ active: currentRouteName === 'Events' }">Events</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/ticket-generator" v-bind:class="{ active: currentRouteName === 'TicketGenerator' }">Ticket Generator</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/contact-us" v-bind:class="{ active: currentRouteName === 'ContactUs' }">Contact Us</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <div id="body">
    <router-view />
  </div>
  <!-- Footer section -->
  <footer class="mt-4" id="footer" style="background-color: #726f72;">
  <div class="container text-light">
    <div class="row px-md-4 py-md-3">
      <div class="col-12 col-md-4 p-4 text-start">
        <br>
        <img src="./assets/logo.png" class="img-fluid logo" alt="" />
        <p class="mt-3" style="font-family: Verdana; text-align: justify;">
          <br>
          <b>Liudvikas Jakavičius Events is an app designed to manage events, specifically tailored as a task for the Web Development Course at Turing College.</b>
          <br>
          <br>
          © 2024 by Liudvikas Jakavičius
        </p>
      </div>
    </div>
  </div>
</footer>

</template>


<script>
export default {
  data() {
    return {
      categories: [],
    };
  },

  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },

  watch: {
    currentRouteName: {
      handler(newValue) {
        this.alignFooter();
      },
    },
  },

  methods: {
    alignFooter() {
      setTimeout(() => {
        const vpheight = window.innerHeight;
        const bodyheight = document.body.offsetHeight;
        const footer = document.getElementById("footer");
        if (bodyheight >= vpheight) {
          if (footer) {
            footer.style.position = "relative";
          }
        } else {
          if (footer) {
            footer.style.position = "fixed";
          }
        }
      }, 100);
    },
  },
    // Add event listener for window resize to dynamically adjust footer position
  mounted() {
    this.alignFooter();
    window.addEventListener("resize", () => {
      const vpheight = window.innerHeight;
      const bodyheight = document.body.offsetHeight;
      const footer = document.getElementById("footer");
      if (bodyheight >= vpheight) {
        if (footer) {
          footer.style.position = "relative";
        }
      } else {
        if (footer) {
          footer.style.position = "fixed";
        }
      }
    });
  },
};
</script>

<style>

/* Custom styles for the navigation menu items */
.navbar-nav .nav-link {
  font-family: Verdana, sans-serif;
  padding: 0.5rem 1rem;
  color: #777; /* Grey font color */
  transition: color 0.3s; /* Smooth transition for font color */
}

.nav-item {
  border-right: 1px solid #ccc;
}

.nav-item:last-child {
  border-right: none;
}

.nav-link:hover,
.nav-link:focus {
  color: #000; /* Black font color on hover and focus */
}

.nav-link.active {
  color: #000; /* Black font color for active link */
}

#app {
  font-family: serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "circular";
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50; /* Dark grey font color */
}

ul {
  padding-left: 0 !important;
}

ul li {
  list-style-type: none;
}

html {
  position: relative;
  min-height: 100%;
}

footer {
  bottom: 0;
  height: auto;
  left: 0;
  position: relative;
  width: 100%;
}

.bg-custom {
  background-color: #f3f2f0;
}

.bg-silver {
  background-color: #f3f2f0 !important;
}

.logo {
  width: 160px;
  border-radius: 10px;
}



</style>