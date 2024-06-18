const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  },
  {timestamps: true}
);

userSchema.pre('save', async function(next) {
  console.log("MongoDB User PreSave")
});

const User = mongoose.model('User', userSchema);

module.exports = User;