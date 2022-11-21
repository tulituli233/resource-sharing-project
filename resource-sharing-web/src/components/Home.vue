<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <!-- <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span> -->
      </div>
      <el-button type="info" @click="tuichu">退出</el-button>
      <tagsView>1234</tagsView>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|&nbsp;|&nbsp;|</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="this.$store.state.Nav"
        >
          <el-submenu
            v-for="item in menulist"
            :key="item.id"
            :index="item.id + ''"
            @click="saveNav('/' + item.path)"
          >
            <template slot="title">
              <router-link
                ref="item"
                class="memuItem"
                :to="{ path: item.path, fullPath: item.fullPath }"
              >
                <div>
                  <i :class="iconsObj[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </div>
              </router-link>
            </template>
            <!-- <el-menu-item @click="saveNav('/' + item.path)"
              :index="'/' + item1.path"
              v-for="item1 in item.children"
              :key="item1.id"
              @click="saveNav('/' + item1.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{ item1.authName }}</span>
            </el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧 -->
      <el-main :style="`height:${newHeight}px`">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Welcome from './Welcome.vue'
import tagsView from "../layout/TagsView.vue";
export default {
  name: "Home",
  data() {
    return {
      menulist: [],
      iconsObj: {
        999: "el-icon-user-solid",
        998: "el-icon-s-tools",
        997: "el-icon-s-goods",
        996: "el-icon-s-order",
        995: "el-icon-s-marketing",
        994: "el-icon-s-claim",
      },
      isCollapse: false,
      defaultMenu: [
        {
          authName: "首页",
          path: "/index",
          fullPath: "/home/index",
          id: 999,
        },
        {
          authName: "关注",
          path: "/follow",
          fullPath: "/home/follow",
          id: 998,
        },
        {
          authName: "分类",
          path: "/cate",
          fullPath: "/home/cate",
          id: 997,
        },
        {
          authName: "信息",
          path: "/message",
          fullPath: "/home/message",
          id: 996,
        },
        {
          authName: "我的",
          path: "/my",
          fullPath: "/home/my",
          id: 995,
        },
      ],
      newHeight: 800,
      // Nav:''
    };
  },
  computed: {
    
  },
  components: {
    tagsView,
  },
  created() {
    this.getMenuList();
    this.newHeight = window.innerHeight - 150;
    window.onresize = () => {
      this.newHeight = window.innerHeight - 130;
      // console.log(this.newHeight);
    };
    // this.Nav=window.sessionStorage.getItem('Nav');//侧边栏选中项
    // this.Nav=this.$store.state.Nav
  },
  methods: {
    tuichu() {
      window.sessionStorage.clear(); //clear清除缓存区
      this.$router.push("/login"); //路由跳转
    },
    async getMenuList() {
      try {
        const { data: res } = await this.$http.get("menus");
        if (res.meta.status !== 200) {
          this.menulist.push(this.defaultMenu);
          return this.$message.error(res.meta.msg);
        }
        this.menulist = res.data;
        // this.menulist.push(this.defaultMenu);
      } catch (e) {
        // this.menulist.push(this.defaultMenu);
        this.menulist = this.defaultMenu;
      }
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存页面状态
    saveNav(val) {
      // console.log(val);
      this.$store.commit("saveNav", val);
      // this.$router.push(val);
    },
  },
};
const token = window.sessionStorage.getItem("token");
</script>

<style lang="less" >
.home-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
      .memuItem {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  .el-main {
    background-color: #eaedf1;
    width: 1200px;
    height: 600px;
  }

  .el-submenu__icon-arrow {
    display: none;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    //鼠标触摸样式
    cursor: pointer;
  }
  .tags-view-container {
    position: absolute;
    top: 60px;
    left: 200px;
  }
}
</style>