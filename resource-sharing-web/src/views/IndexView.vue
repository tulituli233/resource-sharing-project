<template>
  <div>
    <ArticleList></ArticleList>
  </div>
</template>

<script>
// import ArticleList from '@/components/Article/ArticleList.vue'
export default {
  // components:{
  //   ArticleList
  // },
  data() {
    return {
      queryInfo: {
        cate: '',
        mark: '',
        pagenum: 1,
        pagesize: 10,
      },
    }
  },
  created() {
    document.title = "资源共享--首页";
    this.getArticleList();
  },
  methods: {
    async getArticleList(){
      const { data: res } = await this.$http.post("/my/article/alist", this.queryInfo);
      console.log(res.data.alist);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.$store.dispatch("indexArticleListAys", res.data.alist);
      // window.sessionStorage.setItem("token", res.data);
    }
  },
};
</script>

<style lang="less" scoped>
</style>