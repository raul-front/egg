'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const QuestionSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    description: { type: String },
    questioner: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
    topics: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
      select: false,
    },
  }, { timestamps: true });
  return mongoose.model('Question', QuestionSchema);
};
