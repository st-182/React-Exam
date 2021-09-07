import mongoose from "mongoose";
const { Schema } = mongoose;

const voteSchema = new Schema({
  team_id: {
    type: Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  rating_votes: {
    type: Number,
    required: true,
  },
  who_created: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // who_voted: [
  //   {
  //     user_id: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users",
  //     },
  //     voted: {
  //       type: Boolean,
  //       required: true,
  //     },
  //     value: {
  //       type: Boolean,
  //       required: true,
  //     },
  //   },
  // ],
});

const Votes = mongoose.model("votes", voteSchema);
export default Votes;
