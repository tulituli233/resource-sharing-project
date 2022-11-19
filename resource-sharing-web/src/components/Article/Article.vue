<template>
  <div>
    <h2>{{Article.Title}}</h2>
    <div class="ContentBox" v-html="Article.Content">{{Article.Content}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // Article:{}
    };
  },
  created() {
    // document.title = "资源共享--文章详情";
  },
  computed:{
    Article(){
        return this.$store.state.Article;
    }
  }
};
</script>

<style lang="less" scoped>
</style>