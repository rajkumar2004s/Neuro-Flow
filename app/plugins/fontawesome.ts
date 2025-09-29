import { defineNuxtPlugin } from "#app";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import the icons you need

// Disable auto CSS (Nuxt will import it)
config.autoAddCss = false;

// Add icons to the library

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
