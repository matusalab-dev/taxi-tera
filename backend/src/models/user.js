import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's full name
 *         username:
 *           type: string
 *           description: The user's unique username
 *         email:
 *           type: string
 *           description: The user's unique email address
 *           format: email
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           description: The user's role
 *           enum:
 *             - admin
 *             - user
 *           default: user
 *       example:
 *         name: John Doe
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: password123
 *         role: user
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  savedRoutes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SavedRoute",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
