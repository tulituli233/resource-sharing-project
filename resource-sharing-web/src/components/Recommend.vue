<template>
  <div class="recommendBox">
    <div class="recommendItemBox" v-for="(item, i) in reCommendList" :key="i">
      <div class="headerBox">
        {{ item.RecommendName }}
      </div>
      <div class="bodyBox">
        <div class="bodyItem" v-for="(item1, i1) in item.aList" :key="i1">
          {{ item1.Title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      reCommendList: [
        {
          RecommendName: "火热分享",
          aList: [
            {
              Title: "2022年考研资料",
              ArticleId: 1,
            },
            {
              Title: "英语四六级",
              ArticleId: 1,
            },
            {
              Title: "教师资格考试",
              ArticleId: 1,
            },
            {
              Title: "《独行月球》",
              ArticleId: 1,
            },
            {
              Title: "《巨鳄2》",
              ArticleId: 1,
            },
            {
              Title: "《小黄人大眼萌：神偷奶爸前传》",
              ArticleId: 1,
            },
            {
              Title: "《疯狂动物城》",
              ArticleId: 1,
            },
            {
              Title: "《三体》三部曲",
              ArticleId: 1,
            },
            {
              Title: "《侏罗纪世界3》",
              ArticleId: 1,
            },
            {
              Title: "《间谍过家家2》",
              ArticleId: 1,
            },
          ],
        },
        {
          RecommendName: "优质分享",
          aList: [
            {
              Title: "计算机专业电子书",
              ArticleId: 1,
            },
            {
              Title: "《中华小子》超清重制版",
              ArticleId: 1,
            },
            {
              Title: "《海贼王》漫画",
              ArticleId: 1,
            },
            {
              Title: "中外名著阅读",
              ArticleId: 1,
            },
            {
              Title: "《灵笼》",
              ArticleId: 1,
            },
            {
              Title: "纪录片《动物世界》",
              ArticleId: 1,
            },
            {
              Title: "《荒野生存》1~8季",
              ArticleId: 1,
            },
            {
              Title: "男频小说集",
              ArticleId: 1,
            },
            {
              Title: "女频小说集",
              ArticleId: 1,
            },
            {
              Title: "《西部世界》",
              ArticleId: 1,
            },
          ],
        },
        {
          RecommendName: "最新分享",
          aList: [
            {
              Title: "2022四级真题",
              ArticleId: 1,
            },
            {
              Title: "《植物大战僵尸》",
              ArticleId: 1,
            },
            {
              Title: "《公考汇总》",
              ArticleId: 1,
            },
            {
              Title: "《剑指office》",
              ArticleId: 1,
            },
            {
              Title: "林肯公园音乐集",
              ArticleId: 1,
            },
            {
              Title: "《亿万僵尸》",
              ArticleId: 1,
            },
            {
              Title: "《C++从入门到入土》",
              ArticleId: 1,
            },
            {
              Title: "Unity3游戏素材包",
              ArticleId: 1,
            },
            {
              Title: "《撒旦的奴隶2》",
              ArticleId: 1,
            },
            {
              Title: "经典flesh游戏",
              ArticleId: 1,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.recommendBox {
  .recommendItemBox {
    width: 300px;
    background-color: #fff;
    margin-bottom: 10px;
    box-shadow: 10px 10px 5px #ccc;
    .headerBox {
      background-color: #fca60b;
      color: #fff;
      padding: 10px;
    }
    .bodyBox {
      padding: 10px;
      .bodyItem {
        padding: 5px;
        border-bottom: 1px dashed #ccc;
        font-size: 18px;
      }
    }
  }
}
</style>