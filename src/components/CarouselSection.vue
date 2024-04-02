<template>
    <!-- Root container for the carousel section -->
    <div class="root">
      <!-- Container for the main slider -->
      <div class="slider-main">
        <!-- Display the current slide if available, otherwise display the default slide (img1.jpg) -->
        <img v-if="currSlide" :src="currSlide" class="img-fluid slide" alt="event showcase" /> 
        <img v-else src="../assets/img1.jpg" class="img-fluid slide" alt="event showcase" /> 
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Component name
    name: "CarouselSection",
  
    // Component data
    data() {
      return {
        // Array of slide objects with IDs and image sources
        slides: [
          {
            id: 1,
            src: "img1.jpg",
          },
          {
            id: 2,
            src: "img2.jpg",
          },
          {
            id: 3,
            src: "img3.jpg",
          },
        ],
        // Current slide source
        currSlide: null,
        // Counter to keep track of the current slide index
        count: 0,
      };
    },
  
    // Component methods
    methods: {
      // Method to update slides periodically
      updateSlides() {
        setInterval(() => {
          // Reset count if it reaches the end of slides array
          if (this.count == 3) {
            this.count = 0;
          }
          // Set current slide source dynamically based on the count
          this.currSlide = require("../assets/" + this.slides[this.count].src);
          // Increment count for the next slide
          this.count++;
        }, 3000);
      },
    },
  
    // Lifecycle hook: called after the component has been mounted
    mounted() {
      // Start updating slides when component is mounted
      this.updateSlides();
    },
  };
  </script>
  
  <style scoped>
  /* Styles for the slide images */
  .slide {
    width: 100%;
    object-fit: cover;
    object-position: center;
    height: 80vh;
  }
  
  /* Styles for the main slider container */
  .slider-main {
    position: relative;
  }
  
  /* Styles for the heading inside the slider */
  .slider-main h1 {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 10%;
    transform: translate(-10%, -50%);
    font-size: 3.5rem;
  }
  
  /* Additional styles for the heading if it uses Verdana font family */
  .slider-main h1.font-verdana {
    font-family: Verdana;
  }
  
  /* Media query for smaller screens */
  @media (max-width: 991px) {
    .slider-main h1 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  </style>