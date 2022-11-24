<template>
  <div class="CollectionBox">
    <FootMarkList :footmarkList="footmarkList"></FootMarkList>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--我的收藏";
    this.getNoteList();
  },
  data() {
    return {
      footmarkList: [],
    };
  },
  methods: {
    async getNoteList() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/userinfo/footmark", {
        params: {
          UserId: userInfo.id,
          NoteType: 1,
        },
      });
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return;
        this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      console.log(res.data.footmarkList);
      this.footmarkList = res.data.footmarkList;
    },
  },
};
</script>

<style lang="less" scoped>
.CollectionBox {
  // width: 800px;
}
</style>