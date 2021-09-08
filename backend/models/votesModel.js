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
    default: function () {
      if (this.who_voted) {
        const score = this.who_voted.reduce((acc, cur) => {
          cur.value ? acc++ : acc--;
          return acc;
        }, 0);
        return score;
      }
      return 0;
    },
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
      voted: {
        type: Boolean,
        required: true,
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
