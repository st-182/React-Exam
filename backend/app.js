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
    votes: "http://localhost:5000/api/votes",
  })
);

//todo GET: all users
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// //todo GET: get single user based on id
// app.get("/api/users/:id", async (req, res) => {
//   let userId = req.params.id;

//   let user = await User.findById(userId);

//   res.json(user);
// });

//todo GET: all teams
app.get("/api/teams", async (req, res) => {
  let user = await Team.find();
  // let cars = await Car.find({ user_id: userId });

  res.json(user); //{ ...user.toObject(), cars: [...cars] }
});

//todo GET: all votes
app.get("/api/votes", async (req, res) => {
  let user = await Votes.find();

  res.json(user);
});

//todo GET: all teams and votes
app.get("/api/teams_votes", async (req, res) => {
  Team.aggregate([
    {
      $lookup: {
        from: "votes", //The collection you're getting the items from
        localField: "_id", //The local field you're using to lookup
        foreignField: "team_id", //The field the `A` document you're using to match
        as: "votes", //The name of the field that will be populated with the results
      },
    },
  ]).then((response) => {
    res.json(response);
  });
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

//todo POST: Add a team
app.post("/api/teams", async (req, res) => {
  const userAndTeamUnchecked = req.body;
  const user = userAndTeamUnchecked.user;
  const team = userAndTeamUnchecked.team;

  const teamResult = await Team.insertMany(team);
  const votesResult = await Votes.insertMany({
    team_id: teamResult[0]._id,
    who_created: user,
  });

  res.json({ result_team: teamResult, result_votes: votesResult });
});

//todo POST: Change a vote
app.post("/api/vote/:id", async (req, res) => {
  let voteId = req.params.id;
  const vote = req.body;

  const teamResult = await Votes.findByIdAndUpdate(voteId, {
    rating_votes: vote,
  });

  res.json(teamResult);
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

//todo PUT: User votes for team
app.put("/api/votes/:id", async (req, res) => {
  const voteId = req.params.id; //vote ID
  const userVoted = req.body; // object with user's changed vote or new vote
  const votesForATeam = await Votes.findById(voteId); //finding the team's "votes" document, which describes team's scores
  let score; // initializing a score, which i cannot calculate using schema :(

  const myVote = votesForATeam.who_voted.filter((user) => {
    // console.log(user.user_id);
    // console.log(userVoted.user_id);
    return user.user_id.toString() === userVoted.user_id;
  }); // referencing a user's vote, which he made previously
  console.log(myVote.length);
  if (myVote.length === 1) {
    //checking if he actually made this vote
    console.log(myVote[0].value);
    console.log(userVoted.value);
    myVote[0].value = userVoted.value; // if he did, then changing the value in his vote
    console.log("now: ", myVote[0].value);

    score = votesForATeam.who_voted.reduce((acc, cur) => {
      // now taking all votes and calculating them
      cur.value ? acc++ : acc--;
      return acc;
    }, 0);
    votesForATeam.rating_votes = score; //giving value to team's "votes" document
    console.log(votesForATeam);

    await Votes.findByIdAndUpdate(voteId, { ...votesForATeam }); // passing this updated vote to votes collection
  } else {
    console.log("empty array");
    //in case this is his first this user's vote
    if (votesForATeam.who_voted.length > 0) {
      //checking are there other votes
      score = votesForATeam.who_voted.reduce((acc, cur) => {
        // if yes, then calculating their value
        cur.value ? acc++ : acc--;
        return acc;
      }, 0);
      if (userVoted.value) {
        //and adding current value of a new vote
        score++;
      } else {
        score--;
      }
    } else {
      //adding current value of a first vote
      if (userVoted.value) {
        score = 1;
        votesForATeam.rating_votes = score; //giving value to team's "votes" document
      } else {
        score = -1;
        votesForATeam.rating_votes = score; //giving value to team's "votes" document
      }
    }

    const votes = await Votes.findByIdAndUpdate(voteId, {
      // AND FINALLY UPLOADING RESULT
      rating_votes: score,
      $push: { who_voted: userVoted },
    });
  }

  res.json(votesForATeam);
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
