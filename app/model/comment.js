'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new mongoose.Schema({
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false },
    questionId: { type: String, required: true },
    answerId: { type: String, required: true },
    rootCommentId: { type: String }, // 上一级评论id
    replyTo: { type: Schema.Types.ObjectId, ref: 'User' },
  }, { timestamps: true });

  return mongoose.model('Comment', CommentSchema);
};
