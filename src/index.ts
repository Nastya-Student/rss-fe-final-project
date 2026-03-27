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
import { ForgotPasswordPage } from "./pages/forgot-password.page/forgot-password.page.js";
import { UpdatePasswordPage } from "./pages/update-password.page/update-password.page.js";
import { appStateService } from "./api/app-state.service";

const app = new App(document.body);
await appStateService.init();

app.init();
app.register("landing", new LandingPage());
app.register("login", new LoginPage());
app.register("register", new RegisterPage());
app.register("dashboard", new DashboardPage());
app.register("library", new LibraryPage());
app.register("practice", new PracticePage());
app.register("profile", new ProfilePage());
app.register("404", new ErrorPage());
app.register("forgot-password", new ForgotPasswordPage());
app.register("update-password", new UpdatePasswordPage());

const router = new Router(app);
router.init();
