const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'], // only these 3 values are allowed
      default: 'pending', // every new job starts as pending
    },
    createdBy: {
      type: mongoose.Types.ObjectId, // stores the ID of the user who created this job
      ref: 'User', // links to the User model (for populate() if needed later)
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields
)

module.exports = mongoose.model('Job', JobSchema)
