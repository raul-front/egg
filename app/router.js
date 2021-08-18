'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const auth = middleware.auth();

  // router.get('/', controller.home.index);

  /** ******************** 用户 ******************** **/
  router.post('/login', controller.access.login);
  router.post('/api/logout', controller.access.logout);
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.patch('/api/users/:id', controller.user.update);
  router.delete('/api/users/:id', controller.user.remove);
  router.delete('/api/users', controller.user.removes);
  // 关注
  router.get('/api/users/:id/following', controller.user.listFollowing);
  router.get('/api/users/:id/followers', controller.user.listFollowers);
  router.put('/api/users/following/:id', controller.user.following);
  router.delete('/api/users/following/:id', controller.user.unfollowing);
  // 话题
  router.get('/api/users/:id/followingTopics', controller.user.listFollowingTopics);
  router.put('/api/users/followingTopics/:id', controller.user.followTopics);
  router.delete('/api/users/followingTopics/:id', controller.user.unFollowTopics);
  // 问题
  router.get('/api/users/:id/questions', controller.user.listQuestions);
  // 点赞、踩
  router.get('/api/users/:id/likingAnswers', controller.user.listLikingAnswers);
  router.put('/api/users/likingAnswers/:id', controller.user.likeAnswer);
  router.delete('/api/users/likingAnswers/:id', controller.user.unlikeAnswer);
  router.get('/api/users/:id/dislikingAnswers', controller.user.listDislikingAnswers);
  router.put('/api/users/dislikingAnswers/:id', controller.user.dislikeAnswer);
  router.delete('/api/users/dislikingAnswers/:id', controller.user.undislikeAnswer);
  // 收藏
  router.get('/api/users/:id/collectingAnswers', controller.user.listCollectingAnswers);
  router.put('/api/users/collectingAnswers/:id', controller.user.collectAnswer);
  router.delete('/api/users/collectingAnswers/:id', controller.user.uncollectAnswer);

  /** ******************** 话题 ******************** **/
  router.get('/api/topics', controller.topic.index);
  router.get('/api/topics/:id', controller.topic.show);
  router.post('/api/topics', controller.topic.create);
  router.put('/api/topics/:id', controller.topic.update);
  router.get('/api/topics/:id/followers', controller.topic.listFollowers);
  router.get('/api/topics/:id/questions', controller.topic.listQuestions);

  /** ******************** 问题 ******************** **/
  router.get('/api/questions', controller.question.index);
  router.get('/api/questions/:id', controller.question.show);
  router.post('/api/questions', controller.question.create);
  router.patch('/api/questions/:id', controller.question.update);
  router.delete('/api/questions/:id', controller.question.remove);

  /** ******************** 答案 ******************** **/
  router.get('/api/questions/:questionId/answers', controller.answer.index);
  router.get('/api/questions/:questionId/answers/:id', controller.answer.show);
  router.post('/api/questions/:questionId/answers', controller.answer.create);
  router.patch('/api/questions/:questionId/answers/:id', controller.answer.update);
  router.delete('/api/questions/:questionId/answers/:id', controller.answer.remove);

  /** ******************** 评论 ******************** **/
  router.get('/api/questions/:questionId/answers/:answerId/comments', controller.comment.index);
  router.get('/api/questions/:questionId/answers/:answerId/comments/:id', controller.comment.show);
  router.post('/api/questions/:questionId/answers/:answerId/comments', controller.comment.create);
  router.patch('/api/questions/:questionId/answers/:answerId/comments/:id', controller.comment.update);
  router.delete('/api/questions/:questionId/answers/:answerId/comments/:id', controller.comment.remove);

  /** ******************** 角色管理 ******************** **/
  // role 接口是一个curd 接口模板
  router.get('/api/roles/test', controller.role.test); // 批量生成测试数据
  router.get('/api/roles', controller.role.index);
  router.get('/api/roles/:id', controller.role.show);
  router.post('/api/roles', controller.role.create);
  router.put('/api/roles/:id', controller.role.update);
  router.delete('/api/roles/:id', controller.role.remove);
  router.delete('/api/roles', controller.role.removes);
};
