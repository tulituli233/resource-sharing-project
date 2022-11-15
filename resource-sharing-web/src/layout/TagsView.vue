<template>
  <div id="tags-view-container" class="tags-view-container">
    <div ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <!-- 设置中键和右键点击事件 -->
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </div>
    <!-- 标签窗口清除菜单 -->
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <!-- 固定标签不可关闭 -->
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script>
import path from "path";
// import { log } from 'console'

export default {
  data() {
    return {
      visible: false, //右键菜单显隐
      top: 0, //右键菜单位置
      left: 0,
      selectedTag: {},
      affixTags: [],
    };
  },
  //计算属性
  computed: {
    // 访问过的页面
    visitedViews() {
      return this.$store.state.visitedViews;
    },
    //固定标签的路线
    routes() {
      //使用vuex
      return this.$store.state.routes;
    },
  },
  //监视属性
  watch: {
    // 是线路不是路由
    $route() {
      //路由改变
      this.addTags();
      this.moveToCurrentTag();
      // window.sessionStorage.setItem("Nav", this.$route.path);
      this.$store.commit("saveNav", this.$route.path);
    },
    //监听value值的变化，可以用v-mode
    visible(value) {
      if (value) {
        //是否开启删除菜单的点击事件监听
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
    // console.log("1");
    // window.sessionStorage.setItem('Nav',this.$route.path)
  },
  methods: {
    isActive(route) {
      //判断是否为当前路线
      // console.log(this.$route.path);
      return route.path === this.$route.path;
    },
    // 判断是否固定
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    // 过滤固定标签，返回标签数组
    filterAffixTags(routes, basePath = "/") {
      //routes所以路线
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path); //将参数2位置的字符解析到一个绝对路径里
          tags.push({
            fullPath: tagPath, //完整路径（目录）
            path: tagPath, //二级路径（目录）
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          //如果路线有子路线
          const tempTags = this.filterAffixTags(route.children, route.path); //递归
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags; //最终到达VisitedView数组
    },
    //初始化标签列表
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    //增加标签
    addTags() {
      const { name } = this.$route;
      // console.log(this.$route);
      if (name) {
        this.$store.dispatch("addViewAsy", this.$route);
      }
      return false;
    },
    //移动到当前标签
    moveToCurrentTag() {
      const tags = this.$refs.tag; //得到一个标签数组
      this.$nextTick(() => {
        //DOM元素渲染完成后执行
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            // this.$refs.scrollPane.moveToTarget(tag)----
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    //刷新选中的窗口
    refreshSelectedTag(view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
    },
    //删除选择的标签
    closeSelectedTag(view) {
      //使用vuex技术调用delView方法返回promise对象，对象中有处理过后的visitedViews
      this.$store.dispatch("delView", view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          //删除的标签是否为当前窗口
          this.toLastView(visitedViews, view); //是，则前往最后一个标签
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store
        .dispatch("tagsView/delOthersViews", this.selectedTag)
        .then(() => {
          this.moveToCurrentTag();
        });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          //some()函数对数组中的每个元素执行一次回调函数，直到找到回调函数返回true的元素，找到满足条件的就返回，不管剩余的其他元素
          return;
        }
        this.toLastView(visitedViews, view);
      });
    },
    // 去最后一个窗口
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]; //获取返回数组的第一个
      if (latestView) {
        //去最后一个
        this.$router.push(latestView.fullPath);
      } else {
        //自定义默认路由
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/"); //前往默认路由
        }
      }
    },
    //打开右键菜单
    openMenu(tag, e) {
      // 设置右键菜单位置与大小
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true; //右键菜单的显隐
      this.selectedTag = tag; //选中的标签
    },
    //关闭右键菜单
    closeMenu() {
      this.visible = false;
    },
    //处理滚动,滚动则关闭右键菜单
    handleScroll() {
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    margin: 5px;
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
