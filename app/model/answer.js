'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AnswerSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    answerer: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: true },
    questionId: { type: String, required: true },
    voteCount: { type: Number, required: true, default: 0 },
  }, { timestamps: true });
  return mongoose.model('Answer', AnswerSchema);
};
