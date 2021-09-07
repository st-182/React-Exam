import mongoose from "mongoose";
const { Schema } = mongoose;

const teamSchema = new Schema({
  team_name: {
    type: String,
    required: true,
  },
  team_logo: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  creation_year: {
    type: Number,
    required: true,
  },
});

const Team = mongoose.model("teams", teamSchema);
export default Team;
