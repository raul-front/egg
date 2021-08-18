'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar_url: { type: String },
    gender: { type: String, enum: [ 'male', 'female' ], default: 'male', required: true },
    headline: { type: String },
    locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false }, // 坐标
    business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false }, // 行业
    employments: {
      type: [{
        company: { type: Schema.Types.ObjectId, ref: 'Topic' }, // 公司
        job: { type: Schema.Types.ObjectId, ref: 'Topic' }, // 工作
      }],
      select: false,
    },
    educations: {
      type: [{
        school: { type: Schema.Types.ObjectId, ref: 'Topic' }, // 学校
        major: { type: Schema.Types.ObjectId, ref: 'Topic' }, // 专业
        diploma: { type: Number, enum: [ 1, 2, 3, 4, 5 ] },
        entrance_year: { type: Number },
        graduation_year: { type: Number },
      }],
      select: false,
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      select: false,
    },
    followingTopics: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
      select: false,
    },
    // 赞过的答案
    likingAnswers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
      select: false,
    },
    // 踩过的答案
    dislikingAnswers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
      select: false,
    },
    collectingAnswers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
      select: false,
    },
  }, { timestamps: true });
  return mongoose.model('User', UserSchema);
};
