<template>
  <el-container class="home-container">
    <el-header>
      <div class="logoBox">
        <!-- <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span> -->
      </div>
      <!-- 顶部搜索框 -->
      <div class="TopSelectBox">
        <el-input
          :placeholder="pstr"
          v-model="inputTopVal"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="toCateView(inputTopVal)"
          ></el-button>
        </el-input>
        <!-- <router-link
          ref="item"
          class="memuItem"
          :to="{ path: '/cate', fullPath: '/home/cate' }"
          v-slot="{ navigate, isActive }"
        >
                <NavLink
              ></NavLink> 
        </router-link> -->
      </div>
      <div class="UserBox">
        <div class="avdiv" @click="toMainPage">
          <el-avatar size="large" class="avatar">{{ username }}</el-avatar>
        </div>
        <el-button type="info" @click="tuichu" class="el-icon-switch-button"
          >退出</el-button
        >
      </div>
      <tagsView></tagsView>
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
        <!-- 分享榜单 -->
        <div class="recommendBox">
          <Recommend></Recommend>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Welcome from './Welcome.vue'
import tagsView from "../layout/TagsView.vue";
export default {
  name: "Home",
  created() {
    this.getMenuList();
    this.newHeight = window.innerHeight - 150;
    window.onresize = () => {
      this.newHeight = window.innerHeight - 130;
      // console.log(this.newHeight);
    };
    this.getChatList();
    // this.Nav=window.sessionStorage.getItem('Nav');//侧边栏选中项
    // this.Nav=this.$store.state.Nav
  },
  mounted() {
    console.log("loo");
    const ws = new WebSocket("ws://localhost:8008");
    ws.addEventListener("open", this.handleWsOpen.bind(this), false);
    ws.addEventListener("close", this.handleWsClose.bind(this), false);
    ws.addEventListener("error", this.handleWsError.bind(this), false);
    ws.addEventListener("message", this.handleWsMessage.bind(this), false);
    this.ws = ws;
    // this.rews();
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      pstr: "请输入内容",
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
          authName: "动态",
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
          authName: "消息",
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
      inputTopVal: "",
      // Nav:''
    };
  },
  computed: {
    username() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      return userInfo.username;
    },
  },
  components: {
    tagsView,
  },

  methods: {
    toMainPage() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      this.$store.commit("saveMainPageData", {
        IssuerId: userInfo.id,
        IssuerName: userInfo.username,
      });
      this.$router.push(`/mainpage`);
    },
    handleWsOpen(e) {
      //   console.log("open", e);
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      console.log("open233");
      this.ws.send(
        JSON.stringify({
          uid: userInfo.id,
        })
      );
    },
    handleWsClose(e) {
      console.log("close", e);
    },
    handleWsError(e) {
      console.log("error", e);
    },
    handleWsMessage(e) {
      console.log("message23", e);
      // tcp实时信息
      // alert(11)
      // console.log(11);

      //方案一成功
      // this.getChatList();

      // console.log(22);
      // alert(22)
      // 方案二成功
      let nowMsg = JSON.parse(e.data);
      console.log(nowMsg);
      let oldChatList = this.$store.state.ChatList;
      oldChatList.forEach((item) => {
        if (item.ToId == nowMsg.FromId) {
          item.msgList.push(nowMsg);
          // console.log("push");
        }
        // console.log("item.ToId==nowMsg.FromId", item.ToId == nowMsg.FromId);
        // console.log("item.ToId", item.ToId);
        // console.log("nowMsg.FromId", nowMsg.FromId);
      });
      // console.log("oldChatList==", oldChatList);
      this.$store.commit("saveChatList", oldChatList);
      // console.log("ChatList==", this.$store.state.ChatList);
    },
    // 获取私聊数据
    async getChatList() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("my/chat/chatList", {
        params: {
          UserId: userInfo.id,
        },
      });
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        this.$store.commit("saveChatList", []);
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.$store.commit("saveChatList", res.data.ChatList);
    },
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
    toCateView(inputTopVal) {
      // this.$store.commit("saveinputTopVal", inputTopVal);
      // console.log(this.$store.state.inputTopVal);
      // this.$router.push(`/cate?inpVal=${inputTopVal}&t=${Date.now()}`);
      if (inputTopVal == "") return this.$message.error("请输入搜索内容！");
      try {
        this.$router.replace(`/cate?inpVal=${inputTopVal}&t=${Date.now()}`);
      } catch (e) {}
      let istr = this.inputTopVal;
      this.inputTopVal = "";
      this.pstr = istr;
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
    // overflow: hidden;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
    .TopSelectBox {
      width: 500px;
    }
    .UserBox {
      .avatar {
        margin-right: 20px;
        background-color: #3a8ee6;
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
    position: relative;
    .recommendBox {
      width: 300px;
      position: absolute;
      top: 0;
      left: 420px;
      padding-top: 20px;
    }
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