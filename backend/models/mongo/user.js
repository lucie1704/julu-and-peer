const mongoose = require('mongoose');
const logger = require('../../utils/logger');

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
  logger.info("MongoDB User PreSave")
});

const User = mongoose.model('User', userSchema);

module.exports = User;