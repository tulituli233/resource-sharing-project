<template>
  <div class="ArticleListBox">
    <div class="listitem" v-for="(item,i) in alist" :key="i" v-html="item.Content"></div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      alist: [],
    };
  },
  created() {
    this.alist = this.$store.state.indexArticleList;
  },
};
</script>

<style lang="less" scoped>
</style>