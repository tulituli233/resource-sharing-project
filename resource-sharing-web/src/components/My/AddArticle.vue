<template>
  <div>
    <el-form
      :model="addFrom"
      :rules="addFromRules"
      ref="addFormRef"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="addFrom.title"></el-input>
      </el-form-item>
      <el-form-item label="文章简介" prop="brief">
        <el-input type="textarea" :rows="3" v-model="addFrom.brief"></el-input>
      </el-form-item>
      <el-form-item label="文章资源链接" prop="LianJie">
        <el-input
          type="textarea"
          :rows="2"
          v-model="addFrom.LianJie"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章价格" prop="price">
        <!-- <el-input v-model="addFrom.price" type="number"></el-input>  @change="handleChange"-->
        <el-input-number
          v-model="addFrom.price"
          :min="0"
          :max="100"
          label="文章价格"
        ></el-input-number> </el-form-item
      ><el-form-item label="文章标签" prop="tags">
        <!-- <el-tag v-for="item in addFrom.tags" :key="item">{{ item }}</el-tag> -->
        <el-tag
          v-for="(item, i) in addFrom.tags"
          :key="i"
          closable
          @close="handleClose(i)"
          class="tag-item"
          >{{ item }}</el-tag
        >
        <el-input
          class="input-new-tag"
          v-if="addFrom.inputVisible"
          v-model="addFrom.inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleKeyup"
          @blur="handleInputConfirm(addFrom)"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput(addFrom)"
          >+ 新标签</el-button
        >
      </el-form-item>
      <el-form-item label="商品分类" prop="cate">
        <el-cascader
          v-model="addFrom.cate"
          :options="CateList"
          :props="{
            expandTrigger: 'hover',
            label: 'label',
            value: 'value',
            children: 'children',
          }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <!-- action图片上传到后台的api地址 -->
      <!-- <el-upload
            action="https://lianghj.top:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
      <!-- 富文本编辑器 -->
      文章内容
      <quill-editor v-model="addFrom.content"></quill-editor>
      <!-- 添加商品按钮 -->
      <el-button type="primary" class="btnAdd" @click="addArticle"
        >添加文章</el-button
      >
    </el-form>
    <div v-html="ac"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addFrom: {
        title: "qq",
        brief: "qq",
        price: 0,
        tags: ["视频"],
        inputVisible: false,
        inputValue: "",
        //商品分类
        cate: [],
        content: "",
        LianJie: "qq",
      },
      addFromRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 45,
            message: "长度在 1 到 45 个字符",
            trigger: "blur",
          },
        ],
        brief: [
          { required: true, message: "请输入文章简介", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        LianJie: [
          { required: true, message: "请输入文章资源链接", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        // tags: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        cate: [{ required: true, message: "请输入商品分类", trigger: "blur" }],
      },
      CateList: [
        {
          value: "A001",
          label: "影视",
          children: [
            {
              value: "A001",
              label: "电影",
            },
            {
              value: "A002",
              label: "电视剧",
            },
            {
              value: "A003",
              label: "纪录片",
            },
            {
              value: "A004",
              label: "动漫",
            },
            {
              value: "A005",
              label: "综艺",
            },
            {
              value: "A006",
              label: "短视频",
            },
          ],
        },
        {
          value: "B001",
          label: "图片",
          children: [
            {
              value: "B001",
              label: "国漫",
            },
            {
              value: "A002",
              label: "日漫",
            },
            {
              value: "A003",
              label: "美漫",
            },
          ],
        },
        {
          value: "C001",
          label: "书籍",
          children: [
            {
              value: "C001",
              label: "教材",
            },
            {
              value: "C002",
              label: "名著",
            },
            {
              value: "C003",
              label: "小说",
            },
          ],
        },
        {
          value: "D001",
          label: "游戏",
          children: [
            {
              value: "D001",
              label: "单机",
            },
            {
              value: "D002",
              label: "RPG",
            },
            {
              value: "D003",
              label: "RogueLike",
            },
          ],
        },
        {
          value: "E001",
          label: "音乐",
          children: [
            {
              value: "E001",
              label: "古典",
            },
            {
              value: "E002",
              label: "摇滚",
            },
            {
              value: "E003",
              label: "流行",
            },
          ],
        },
        {
          value: "F001",
          label: "其他",
        },
      ],
      ac: "",
    };
  },
  created() {
    document.title = "资源共享--我要分享";
  },
  methods: {
    async addArticle() {
      const loading = this.$loading({
        lock: true,
        text: "上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      //   console.log(this.addFrom);
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      let tags=this.addFrom.tags.join(',')+',';
      const { data: res } = await this.$http.post("/my/article/add", {
        IssuerId: userInfo.id,
        IssuerName: userInfo.username,
        Title: this.addFrom.title,
        Brief: this.addFrom.brief,
        Price: this.addFrom.price,
        Tags: tags,
        CateNum: this.addFrom.cate[this.addFrom.cate.length - 1],
        Content: this.addFrom.content,
        LianJie: this.addFrom.LianJie,
        CreateTime: Date.now()+'',
        ArticleState:1,
      });
      //   console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      loading.close();
      // this.ac=res.data;
    },
    handleClose(i) {
      //   this.dialogVisible = false;
      //   this.$refs.addFormRef.resetFields();
      //   this.addFrom.tags.splice(this.addFrom.tags.indexOf(tag), 1);
      this.addFrom.tags.splice(i, 1);
    },
    handleInputConfirm(row) {
      if (row.inputValue.trim().length === 0) {
        this.$message.error("标签不能为空！");
      } else {
        row.tags.push(row.inputValue.trim());
        this.$message.success("标签添加成功！");
      }
      row.inputValue = "";
      row.inputVisible = false;
      //   this.setAttrVals(row);
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleKeyup() {
      this.$refs.saveTagInput.$refs.input.blur();
    },
    handleChange() {},
  },
};
</script>

<style lang="less" scoped>
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 190px;
  margin-left: 10px;
}
.tag-item {
  margin-left: 10px;
}
</style>