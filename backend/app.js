const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const fs = require("fs");
const dotenv = require("dotenv");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./models/User");

const app = express();

dotenv.config();
//connect to DB
mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	() => console.log("connected to db")
);
//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/storage", express.static("storage"));

// passport jwt strategy config
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.TOKEN_SECRET,
		},
		async function (jwtPayload, done) {
			try {
				const user = await User.findOne({ _id: jwtPayload._id });
				if (!user) {
					return done(new Error(), false);
				}
				return done(null, user);
			} catch (err) {
				return done(new Error(), false);
			}
		}
	)
);

// Import Routes
const personalInfoRoute = require("./routes/personalInfo");
const workRoute = require("./routes/workInfo");
const authRoute = require("./routes/auth");
const socialMediaRoute = require("./routes/socialMedia");
const cvRoute = require("./routes/cv");
const profilePicRoute = require("./routes/profilepic");

app.use("/api", personalInfoRoute);
app.use("/api", workRoute);
app.use("/api", authRoute);
app.use("/api", socialMediaRoute);
app.use("/api", cvRoute);
app.use("/api", profilePicRoute);
//////////////

// handle SPA on production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("../app/dist"));
}

app.listen(process.env.PORT || 3000, () => {
	console.log("server is running at port 3000");
});
