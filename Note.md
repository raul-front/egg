Schema

#### 字段过滤：
  1. 影藏查询字段
    select: false
  2. 影藏 __v
    __v: {type: Number, select: false},
  3. 显示影藏字段
    通过select方法查询，参数为加号连接的字段,第一个前面也必须有+
    fields='+name+age+sex'
    await User.findById(id).select(fields)

### 通过接口参数获取需要查询的字段
1. query参数通过分号连接：
  fields=name;age;sex
2. 通过select查询
```
const { fields = '' } = ctx.query;
const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
const user = await User.findById(ctx.params.id).select(selectFields)
```

### 关注与粉丝
#### 关注与粉丝功能
* 关注、取消关注
* 获取关注人、粉丝列表（用户-用户多对多关系）
#### 操作步骤
* 分析数据结构
* 设计Schema


### 话题功能模块
#### 话题模块功能点
* 话题的增改查
* 分页、模糊搜索
* 用户属性中的话题引用
* 关注/取消关注话题、用户关注的话题列表
#### 操作步骤
* 设计Schema
* 实现restful风格的增改查接口
* 使用postman测试

### 用户属性中的话题引用
#### 操作步骤
* 使用话题引用替代部分用户属性
* 使用postman测试

### 关注话题
#### 操作步骤
* 实现关注话题逻辑（用户-话题多对多关系）
* 使用postman测试

### 问题模块
#### 问题模块功能点
* 问题的增删改查
* 用户的问题列表（用户-问题一对多关系）
* 话题的问题列表+问题的话题列表（话题-问题多对多关系）
* 关注/取消关注问题
#### 用户-问题 一对多关系设计与实现
* 实现增删改查接口
* 实现用户的问题列表接口
* 使用postman测试

#### 话题-问题多对多关系设计与实现
* 实现问题的话题列表接口
* 实现话题的问题列表接口
* 话题可能对应成千上万个问题，问题对应的话题数量比较少，所以在问题中保存话题信息即可



### 答案模块
#### 答案模块功能点
* 答案的增删改查
* 问题-答案/用户-答案 一对多
* 赞/踩答案
* 收藏答案
#### 问题-答案模块二级嵌套的增删改查接口
/api/questions/:questionId/answers/:id
* 设计数据库Schema
* 实现增删改查接口
* 使用postman测试

#### 互斥关系的赞/踩答案接口设计与实现
* 设计数据库Schema
* 实现接口
* 使用postman测试
##### 互斥
点赞时需要取消踩，踩是需要取消点赞

### restful风格的收藏答案接口
* 设计数据库Schema
* 实现接口
* 使用postman测试


### 评论模块
#### 评论模块功能点
* 评论的增删改查
* 答案-评论/问题-评论/用户-评论 一对多
* 一级评论与二级评论
* 赞/踩评论
#### 问题-答案-评论模块三级嵌套的增删改查接口
/api/questions/:questionId/answers/:answersId/comments/:id
#### 一级评论与二级评论接口的设计与实现
* 设计数据库Schema
* 实现接口
* 使用postman测试






























end
