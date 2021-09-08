import mongoose from "mongoose";
const { Schema } = mongoose;

const voteSchema = new Schema({
  team_id: {
    type: Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  rating_votes: {
    type: String,
    required: true,
    default: 0,
  },
  who_created: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  who_voted: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      value: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Votes = mongoose.model("votes", voteSchema);
export default Votes;
