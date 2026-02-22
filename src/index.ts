import App from "./app/app.js";
import { Router } from "./app/router.js";

const app = new App(document.body);

app.init();

const router = new Router(app);
router.init();
