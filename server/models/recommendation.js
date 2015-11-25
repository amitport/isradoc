import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  issuer: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
  target: {type: mongoose.Schema.ObjectId, required: true}
}, {
  timestamps: true
});
recommendationSchema.index(
  {issuer: 1, target: 1},
  { unique: true }
);

const Recommendation = mongoose.model('Recommendation',
  recommendationSchema
);

export default Recommendation;
