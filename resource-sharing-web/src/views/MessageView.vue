<template>
  <div class="message">
    <div class="messageBody">
      <div class="notice">
        <div class="notice_item">
          <i class="el-icon-chat-dot-square"></i>
          <p>私聊</p>
        </div>
        <div class="notice_item">
          <i class="el-icon-chat-dot-round"></i>
          <p>评论回复</p>
        </div>
        <div class="notice_item">
          <i class="iconfont icon-dianzan"></i>
          <p>收到的赞</p>
        </div>
        <div class="notice_item">
          <i class="iconfont icon-laba"></i>
          <p>系统通知</p>
        </div>
      </div>
      <div class="chatList">
        <p>聊天列表</p>
        <div class="messageList">
          <div class="headImage">
            <img
              src="https://cdn.anime-pictures.net/previews/b35/b359040bcd84548d5f587d0ad0764f21_cp.png.avif"
              alt=""
            />
          </div>
          <div class="dialogue">
            <div class="name_time">
              <div class="name">admin</div>
              <div class="time">11-20</div>
            </div>
            <div class="info">
              <div class="content">欢迎你，成为本站用户！</div>
              <div class="number"><span>1</span></div>
            </div>
          </div>
        </div>

        <!-- <div class="messageList">
          <div class="headImage">
            <img
              src="https://cdn.anime-pictures.net/previews/b35/b359040bcd84548d5f587d0ad0764f21_cp.png.avif"
              alt=""
            />
          </div>
          <div class="dialogue">
            <div class="name_time">
              <div class="name">名字</div>
              <div class="time">11-20</div>
            </div>
            <div class="info">
              <div class="content">
                信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容
              </div>
              <div class="number"><span>1</span></div>
            </div>
          </div>
        </div>

        <div class="messageList">
          <div class="headImage">
            <img
              src="https://cdn.anime-pictures.net/previews/b35/b359040bcd84548d5f587d0ad0764f21_cp.png.avif"
              alt=""
            />
          </div>
          <div class="dialogue">
            <div class="name_time">
              <div class="name">名字</div>
              <div class="time">11-20</div>
            </div>
            <div class="info">
              <div class="content">
                信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容
              </div>
              <div class="number"><span>99</span></div>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 10, 100, 200]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--消息";
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.message {
  margin: 10px 0 0 10px;
  width: 800px;
  .messageBody {
    .notice {
      // background-color: rgb(206, 197, 197);
      display: flex;
      justify-content: space-around;
      height: 110px;
      .notice_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        i {
          padding-top: 10px;
          // padding-bottom:-10px ;
          font-size: 40px;
          color: rgb(88, 184, 200);
          // margin: 20px 0 0 4px;
        }
      }
    }
    .chatList {
      margin-top: 20px;
      // background-color: rgb(237, 190, 190);
      p {
        padding: 8px;
      }
      .messageList {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        border-top: 1px solid #9c9c9c;
        .headImage {
          margin: 10px;
          height: 50px;
          width: 50px;
          border-radius: 25px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .dialogue {
          width: 720px;
          .name_time {
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name {
              // padding-left: 10px;
            }
            .time {
              color: #9c9c9c;
              font-size: 10px;
            }
          }
          .info {
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .content {
              // margin-top: 6px;
              // padding-left: 10px;
              padding-top: 7px;
              width: 95%;
              color: #9c9c9c;
              font-size: 13px;
              overflow: hidden; /*对超出容器的部分强制截取，高度不确定则换行*/
              text-overflow: ellipsis; /*显示省略符号来代表被修剪的文本。*/
              white-space: nowrap; /*禁止换行*/
            }
            .number {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              background-color: #ff679a;
              font-size: 12px;
              color: #f0f0f0;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}
.iconfont {
  width: 40px;
  height: 40px;
  // padding-right: 10px;
}
</style>