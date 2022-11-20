<template>
  <div>{{Comment}}</div>
</template>

<script>
export default {
  data() {
    return {
      // Comment: {},
    };
  },
  created() {
    // document.title = "资源共享--文章详情";
  },
  computed: {
    Comment() {
      return this.$store.state.Comment;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
</style>