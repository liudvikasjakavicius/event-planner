import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import EventDetails from '../views/EventDetails.vue';
import AddEvent from '../views/AddEvent.vue';
import ContactUs from '../views/ContactUs.vue';
import Events from '../views/Events.vue';
import TicketGenerator from '../views/TicketGenerator.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/details',
    name: 'details',
    component: EventDetails,
  }, 
  {
    path: '/add-event',
    name: 'add-event',
    component: AddEvent,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    props: (route) => ({ events: route.params.events }), // Pass events as props
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs,
  },
  {
    path: '/ticket-generator',
    name: 'ticket-generator',
    component: TicketGenerator,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
