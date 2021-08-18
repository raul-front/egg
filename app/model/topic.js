'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const TopicSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true, unique: true },
    avatar_url: { type: String },
    introduction: { type: String, select: false },
  }, { timestamps: true });
  return mongoose.model('Topic', TopicSchema);
};
