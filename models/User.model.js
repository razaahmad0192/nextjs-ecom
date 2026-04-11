import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        select: false, // Exclude password from query results by default
    },
    avatar:{
        url:{
            type: String,
            trim: true,
        },
        public_id:{
            type: String,
            trim: true,

        }
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    phone:{
        type: String,
        trim: true,
    },
    address:{
        type: String,
        trim: true,
    },
    deletedAt: {
        type: Date,
        default: null,
        index: true,
    },

},{timestamps: true});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods = {
    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password);
    }
}

if (process.env.NODE_ENV === "development" && mongoose.models.User) {
    delete mongoose.models.User;
}

const UserModel = mongoose.models.User || mongoose.model("User", userSchema, "users");

export default UserModel;