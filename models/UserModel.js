import mongoose from 'mongoose';

//creating user schema 
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "please provide full name"]
    },
    mobileNo: {
        type: Number,
        required: [true, 'please provide mobile no '],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'please provide email address'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'please provide address']
    },
    shopName: {
        type: String,
    },
    shopAddress: {
        type: String,
    },
    isOwner: {
        type: Boolean,
        required: [true, 'please give role of user']
    },
    password: {
        type: String,
        required: [true, 'please provide user password ']
    },
    petName: {
        type: String,
        required: [true, 'please provide pet name']
    }
})


//creating user mdoel
const User =  mongoose.models.users || mongoose.model("users", userSchema);


// exporting user 
export default User;