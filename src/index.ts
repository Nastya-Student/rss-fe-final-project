import App from "./app/app.js";
import { Router } from "./app/router.js";
import { DashboardPage } from "./pages/dashboard.page/dashboard.page.js";
import { ErrorPage } from "./pages/error.page/error.page.js";
import { LandingPage } from "./pages/landing.page/landing.page.js";
import { LibraryPage } from "./pages/library.page/library.page.js";
import { LoginPage } from "./pages/login.page/login.page.js";
import { PracticePage } from "./pages/practice.page/practice.page.js";
import { ProfilePage } from "./pages/profile.page/profile.page.js";
import { RegisterPage } from "./pages/register.page/register.page.js";

const app = new App(document.body);

app.init();
app.register("landing", new LandingPage());
app.register("login", new LoginPage());
app.register("register", new RegisterPage());
app.register("dashboard", new DashboardPage());
app.register("library", new LibraryPage());
app.register("practice", new PracticePage());
app.register("profile", new ProfilePage());
app.register("404", new ErrorPage());

const router = new Router(app);
router.init();
