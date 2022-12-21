<template>
  <div class="AvatarBox">
    <div class="titleBOx">设置头像</div>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3838/my/article/setAvatar"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "MyAvatar",
  created() {
    document.title = "资源共享--设置头像";
  },
  data() {
    return {
      imageUrl: "",
      headers: {
        Authorization: "",
        file: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //数据处理
      console.log(file);
      this.headers.file = file;
      this.headers.Authorization = window.sessionStorage.getItem("token");
      console.log(this.headers);

      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less">
.AvatarBox {
  .titleBOx {
    padding: 10px;
    background-color: #007acc;
  }
  .avatar-uploader {
    margin-top: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

