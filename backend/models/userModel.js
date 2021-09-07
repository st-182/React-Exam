import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  voted: [
    {
      team_id: {
        type: Schema.Types.ObjectId,
        ref: "team",
        required: true,
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

const User = mongoose.model("users", userSchema);
export default User;
