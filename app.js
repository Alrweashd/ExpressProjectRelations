const connectDb = require("./database");
const userRoutes = require("./api/users/users.routes");
const userMovie = require("./api/movies/movies.routes");
const userActor = require("./api/actors/actors.routes");
const userGenre = require("./api/genres/genres.routes");
const errorHandler = require("./middlewares/errorHandler");
const notFoundPath = require("./middlewares/notFoundPath");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const port = process.env.PORT;
const app = express();
app.use(express.json());
//for logs
app.use(morgan("dev"));
//for auth login
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
//for the images
app.use("/media/", express.static(path.join(__dirname, "media")));
console.log(path.join(__dirname, "media"));
//different strategies, one for users and the other for urls, allowing only the authorized user to modify.
connectDb();
// app.use("/urls", urlRoutes);
app.use("/users", userRoutes);
app.use("/movies", userMovie);
app.use("/actors", userActor);
app.use("/genres", userGenre);
app.use(notFoundPath);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`The application is running on localhost:${port}`);
});
