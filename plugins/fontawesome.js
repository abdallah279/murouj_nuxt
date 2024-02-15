import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, fab, far);

//******************** If you don't need the Spesific icon in your application ********************//
// import {
//   faTwitterSquare,
//   faTwitch,
//   faGithubSquare,
// } from "@fortawesome/free-brands-svg-icons";

// library.add(faTwitterSquare, faTwitch, faGithubSquare);


// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
