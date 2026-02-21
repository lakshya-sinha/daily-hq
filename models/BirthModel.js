import mongoose from 'mongoose';

const BirthSchema = new mongoose.Schema({
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
    },

    aadhar: {
      type: String,
    },
    
    dob: {
      type: Date,
      required: true,
    },

    dobInWords: {
      type: String,
      trim: true,
    },

    placeOfBirth: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherAadhar: {
      type: String,
    },

    motherAadhar: {
      type: String,
    },

    childAddress: {
      type: String,
      required: true,
    },

    parentAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Birth  = mongoose.models.births || mongoose.model("births", BirthSchema);

export default Birth;
