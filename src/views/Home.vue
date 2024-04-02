<template>
  <br>
  <br>
    <!-- Carousel section -->
    <section id="carousel">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 p-0">
            <!-- Include CarouselSection component -->
            <CarouselSection />
          </div>
        </div>
      </div>
    </section>
    <br>
</template>

<script>
import CarouselSection from "../components/CarouselSection.vue";
export default {
  name: "Home",
  components: {
    CarouselSection,
  },
  data() {
    return {
      // Data properties
    };
  },
};
</script>

<!-- Style / CSS for menu and others -->
<style scoped>
.events-title {
  font-family: Verdana;
}

.events-row:nth-child(odd) .col {
  background-color: #333;
}

.events-row:nth-child(even) .col {
  background-color: #726f72;
}

@media (min-width: 992px) {
  .events-row .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
