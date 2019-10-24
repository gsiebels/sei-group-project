const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true, maxlength: 300 },
  category: { type: String, required: true, enum: ['Sport', 'Food', 'Drink', 'Culture', 'Outdoors', 'Music'] },
  intensity: { type: String, enum: ['High', 'Medium', 'Low'] },
  price: { type: Number, required: true },
  availability: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  time: { type: String, required: true, enum: ['Morning', 'Afternoon', 'Evening', 'All-Day'] }
}, {
  timestamps: true
})

module.exports = mongoose.model('Exp', expSchema)