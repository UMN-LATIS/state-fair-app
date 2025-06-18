import { createApp } from 'vue';
import * as UMNComponents from '@umn-latis/cla-vue-template';
import '@umn-latis/cla-vue-template/dist/style.css';

// Create Vue app
const app = createApp({});

// Register UMN components globally
app.component('umn-app-header', UMNComponents.AppHeader);
app.component('umn-app-footer', UMNComponents.AppFooter);
app.component('umn-postit', UMNComponents.PostIt);

// Mount the app
app.mount('#app'); 