# vue-shop-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<!-- 
IssuerId int 作者ID
IssuerName varchar(20) 作者名称
Title varchar(45) 文章标题
Content text 文章内容
LianJie varchar(255) 资源链接
Price int 价格
CateNum varchar(10) 分类编号
CateName varchar(10) 分类名称
Tags varchar(255) 标签 
Brief varchar(255) 简介
CreateTime varchar(18) 创建时间
 -->


<!-- 
CateName varchar(10) 
FirstImgUrl varchar(255) 
ReTime varchar(18)
 -->

 <!-- 
 cate string 文章分类
mark string 搜索关键词
pagnum int 分页页数
pagsize int 分页大小
 -->

 <!-- 
 data:array<article> 
ArticleId int 文章ID
IssuerId int 作者ID
IssuerName varchar(20) 作者名称
Title varchar(45) 文章标题
Views int 浏览量
Likes int 点赞量
Comments int 评论量
Grade int 评分
BuyNum int 购买数量
Price int 价格
CateNum varchar(10) 分类编号 
CateName varchar(10) 分类名称
Tags varchar(255) 标签
FirstImgUrl varchar(255) 第一张图片路径
Brief varchar(255) 简介
ArticleState tinyint 文章状态 0草稿、1待审核、2成功、3失败、4删除
CreateTime varchar(18) 创建时间
ReTime varchar(18) 修改时间
  -->


  <!-- 
  data:array<order> 
OrderId int 购买记录ID
SellerId int 卖家ID
BuyerId int 买家ID
ArticleId int 文章ID
price int 文章价格
Title varchar(45) 文章标题
CreateTime varchar(18) 
ReTime varchar(18)
   -->

<!-- 
IssuerId int 作者ID
IssuerName varchar(20) 作者名称
Title varchar(45) 文章标题
Content text 文章内容
LianJie varchar(255) 资源链接
Price int 价格
CateNum varchar(10) 分类编号
CateName varchar(10) 分类名称
Tags varchar(255) 标签 
Brief varchar(255) 简介
 -->

 <!-- 
 CommentId int AI PK 
ArticleId int 
FromId int 
ToId int 
HasReply tinyint 
CommentContent varchar(255) 
Likes int 
CommentType tinyint 
CreateTime varchar(18) 
ReTime varchar(18) 
OnId int
  -->

<!-- 
ArticleId int 文章ID
FromId int 评论者ID
ToId int 被评论者ID
CommentContent varchar(255) 评论内容
CommentType tinyint 评论为0、回复为1、删除为2
CreateTime varchar(18) 
OnId int 在哪个评论下
FromName varchar(20) 
ToName varchar(20)
 -->


<!-- 

FollowerId int PK 
WriterId int 
WriterName varchar(20) 
FollowState tinyint 
CreateTime varchar(18) 
ReTime varchar(18)
 -->


 <!-- UserId int AI PK 
Username varchar(20) 
Password varchar(255) 
Integral int 
Email varchar(30) 
Phone varchar(20) 
Brief varchar(255) -->
 
<!-- data:array<note> 
NoteId int 记录ID
userId int 用户ID
WriterId int 作者ID
WriterName varchar(20) 作者名
ArticleId int 文章ID
Title varchar(45) 文章标题
NoteType tinyint 记录类型，0历史，1收藏，2购买,3删除
CateNum varchar(10) 分类编号
CateName varchar(10) 分类名称
CreateTime varchar(18) 
ReTime varchar(18) -->


<!-- 
ArticleId int 
FromId int 
ToId int 
HasReply tinyint 
CommentContent varchar(255) 
Likes int 
CommentType tinyint 
CreateTime varchar(18) 
ReTime varchar(18) 
OnId int 
FromName varchar(20) 
ToName varchar(20)
 -->


 <!-- 
 FollowerId int PK 
WriterId int 
WriterName varchar(20) 
FollowState tinyint 
CreateTime varchar(18) 
ReTime varchar(18) -->