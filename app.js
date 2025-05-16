import express from "express";
import cookieParser from "cookie-parser"; 

import movieRouter from "./src/routes/movie.js"
import employeeRouter from "./src/routes/employee.js"
import customerRouter from "./src/routes/customer.js"

import loginRouter from "./src/routes/login.js"
import logoutRouter from "./src/routes/logout.js"

import recoveryPassword from "./src/routes/recoveryPassword.js"


const app = express();

app.use(cookieParser())

app.use(express.json());

app.use("/api/employee", employeeRouter);
app.use("/api/customer", customerRouter);
app.use("/api/movie", movieRouter);

app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);

app.use("/api/recoveryPassword", recoveryPassword);




export default app;