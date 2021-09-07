import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

//mongoDB models:
import User from "./models/userModel.js";
import Team from "./models/teamModel.js";
import Votes from "./models/votesModel.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then((response) => {
    console.log("Connected to MongoDB");
    // Starting server
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  });

//! Routes
//! GET:
app.get("/", (req, res) =>
  res.json({
    users: "http://localhost:5000/api/users",
    teams: "http://localhost:5000/api/teams",
    votes: "http://localhost:5000/api/teams/votes",
  })
);

//todo GET: all users
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  // const cars = await Car.find({});

  // let usersAndCars = users.reduce((total, user) => {
  //   let userCars = cars.filter((car) => car.user_id === "" + user._id);

  //   total.push({ ...user.toObject(), cars: [...userCars] });

  //   return total;
  // }, []);

  res.json(users);
});

//todo GET: get single user based on id
app.get("/api/users/:id", async (req, res) => {
  let userId = req.params.id;

  let user = await User.findById(userId);
  // let cars = await Car.find({ user_id: userId });

  res.json(user); //{ ...user.toObject(), cars: [...cars] }
});

//todo GET: all teams
app.get("/api/teams", async (req, res) => {
  let user = await Team.find();
  // let cars = await Car.find({ user_id: userId });

  res.json(user); //{ ...user.toObject(), cars: [...cars] }
});

//todo GET: all teams
app.get("/api/votes", async (req, res) => {
  let user = await Votes.find();
  // let cars = await Car.find({ user_id: userId });

  res.json(user); //{ ...user.toObject(), cars: [...cars] }
});

//! POST
//todo POST: register new user
app.post("/api/users/signup", (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    const userExists = result.some(
      (userFromDB) => userFromDB.email === user.email
    );

    if (userExists) {
      res.json({
        registrationStatus: "failed",
        message: "User with given email already exists",
      });
    } else {
      user.cars = [];

      const newUser = new User(user);

      newUser.save().then((result) => {
        let { _id } = result;
        res.json({
          registrationStatus: "success",
          userId: _id,
        });
      });
    }
  });
});

//todo POST: Log in existing user
app.post("/api/users/login", (req, res) => {
  let user = req.body;

  User.find().then((result) => {
    let userFounded = result.find(
      (userFromDB) =>
        userFromDB.email === user.email && userFromDB.password === user.password
    );

    if (userFounded) {
      let { _id } = userFounded;

      res.json({
        loginStatus: "success",
        userId: _id,
      });
    } else {
      res.status(401).json({
        loginStatus: "failed",
        message: "Given email or password is incorrect",
      });
    }
  });
});

//todo POST: Log in existing user
app.post("/api/teams", async (req, res) => {
  const userAndTeamUnchecked = req.body;
  const user = userAndTeamUnchecked.user;
  const team = userAndTeamUnchecked.team;

  const teamResult = await Team.insertMany(team);
  const votesResult = await Votes.insertMany({
    team_id: teamResult[0]._id,
    rating_votes: 0,
    who_created: user,
  });

  res.json({ result_team: teamResult, result_votes: votesResult });
});

//! PUT:
//todo PUT: Delete single car based on it's id (use this route for embeded DB with single collection)
// app.put("/api/cars/delete/:id", async (req, res) => {
//   let { userId, carId } = req.body;

//   let userFromDB = await UserAndCars.findById(userId);

//   let carToDeleteIndex = userFromDB.cars.findIndex(
//     (car) => "" + car._id === "" + carId
//   );

//   // updating user data from DB  by removing car
//   userFromDB.cars.splice(carToDeleteIndex, 1);

//   UserAndCars.findByIdAndUpdate(userId, userFromDB).then((result) =>
//     res.json(userFromDB)
//   );
// });

//todo PUT: Add single car to user based on his id
// app.put("/api/cars/add/:id", async (req, res) => {
//   let userId = req.params.id;
//   let carInfo = req.body;

//   carInfo.user_id = userId;

//   let newCar = new Car(carInfo);

//   newCar.save();

//   let user = await User.findById(userId);
//   let cars = await Car.find({ user_id: userId });

//   res.json({ ...user.toObject(), cars: [...cars] });
// });

//todo PUT: Add single car to user based on his id
app.put("/api/teams/:id", async (req, res) => {
  const teamId = req.params.id;
  const voteInfo = req.body;

  const votes = await Votes.findByIdAndUpdate(teamId, { who_voted: voteInfo });

  res.json(votes);
});

//! DELETE:
//todo DELETE: Delete single car based on it's id (for listed DB with multiple collections)
// app.delete("/api/cars/delete/:id", async (req, res) => {
//   const carId = req.params.id;

//   const deletedCar = await Car.findByIdAndDelete(carId);

//   const user = await User.findById(deletedCar.user_id);
//   const cars = await Car.find({ user_id: deletedCar.user_id });

//   res.json({ ...user.toObject(), cars: [...cars] });
// });

// --------------------------------------------------------------------
// REST API
/*
GET:     /api/cars              | Get all cars
         /api/users/:id         | Get single user based on id

POST:    /api/users/signup      | Register new user
         /api/users/login       | Log in existing user

PUT:     /api/cars/delete/:id   | Delete single car based on it's id (for embeded DB with one collention)
         /api/cars/add/:id      | Add single car to user based on his id

DELETE:  /api/cars/delete/:id   | Delete single car based on it's id (for listed DB with multiple collections)
*/
//---------------------------------------------------------------------
