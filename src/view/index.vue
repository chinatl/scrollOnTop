<template>
  <div class="cardList">
    <div class="card-item" v-for="(item,index) in list" :key="item.id">
      <div class="card-title" @click.stop="toExpandItem(!item.isExpand,index)" ref="title">
        <span>{{(index + 1) + '、'+ item.title}}</span>
        <van-icon name="arrow-down"/>
      </div>
      <div ref="content" class="card-content">
        <div v-html="item.content" class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, Collapse, CollapseItem, Icon, List, PullRefresh } from "vant";
import axios from "axios";
import { Base64 } from "js-base64";
import md5 from "js-md5";
import qs from "qs";
import { Toast } from "vant";
export default {
  props: {
    stickyTop: {
      type: Number,
      default: 0
    }
  },
  components: {
    [Cell.name]: Cell,
    [Collapse.name]: Collapse,
    [List.name]: List,
    [CollapseItem.name]: CollapseItem,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon
  },

  data() {
    return {
      list: [],
      loading: false,
      position: "",
      pageNo: 1,
      pageSize: 50,
      timeout: false
    };
  },
  created() {
    this.onLoad();
  },
  mounted() {
    window.onscroll = () => {
      if (this.timeout) return;
      var index = -1;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].isExpand) {
          index = i;
          break;
        }
      }
      console.log(index)
      if (index === -1) return;
      var title = this.$refs.title[index];
      var content = this.$refs.content[index];
      var height = title.getBoundingClientRect().top;
      if (this.getScrollTop() <= this.list[index].height) {
        title.style.position = "relative";
        content.style.marginTop = "0px";
      } else {
        if (height > 0) {
          return;
        } else if (height <= 0) {
          title.style.position = "fixed";
          content.style.marginTop = title.offsetHeight + "px";
        }
      }
    };
  },
  methods: {
    getScrollTop() {
      var scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    },
    onLoad() {
      // const toast = Toast.loading("正在加载！");
      var data = [
        {
          content:
            "<p>这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容</p>",
          createTime: "2019-02-21 09:40:38",
          createUser: "",
          id: "1059",
          sn: "0",
          status: "",
          title: "第一条测试数据",
          typeId: "86",
          updateTime: "2019-02-21 09:40:38",
          updateUser: ""
        },
        {
          content:
            "<p>这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容&nbsp;&nbsp;<br></p>",
          createTime: "2019-02-21 10:47:49",
          createUser: "",
          id: "1060",
          sn: "2",
          status: "",
          title: "第二条数据",
          typeId: "86",
          updateTime: "2019-02-21 10:48:07",
          updateUser: ""
        },
        {
          content:
            "<p>这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容&nbsp;&nbsp;<br></p>",
          createTime: "2019-02-21 10:48:01",
          createUser: "",
          id: "1061",
          sn: "3",
          status: "",
          title: "第三条数据",
          typeId: "86",
          updateTime: "2019-02-21 10:48:01",
          updateUser: ""
        },
        {
          content:
            "<p>这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容 这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容&nbsp;</p>",
          createTime: "2019-02-21 10:48:23",
          createUser: "",
          id: "1062",
          sn: "4",
          status: "",
          title: "第四条测试数据",
          typeId: "86",
          updateTime: "2019-02-21 10:48:30",
          updateUser: ""
        },
        {
          content:
            "<p>这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容 这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容这是是内容&nbsp;</p>",
          createTime: "2019-02-21 10:48:41",
          createUser: "",
          id: "1063",
          sn: "5",
          status: "",
          title: "第五条测试数据",
          typeId: "86",
          updateTime: "2019-02-21 10:48:41",
          updateUser: ""
        }
      ];
      this.list = data.map(res => {
        res.isExpand = false;
        res.height = 500;
        return res;
      });
      this.$nextTick(res => {
        var list = this.$refs.title;
        for (var i = 0; i < list.length; i++) {
          this.list[i].height = list[i].getBoundingClientRect().top;
        }
      });
    },
    toExpandItem(isExpand, index) {
      this.timeout = true;
      var isElse = false; //判断是否点的是别人
      var hasClickIndex; //判断就得打开的下拉框
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].isExpand) {
          isElse = true;
          hasClickIndex = i;
          break;
        }
      }
      var contentList = this.$refs.content;
      if (isExpand) {
        this.list[index].isExpand = true;
        contentList[index].style.height =
          contentList[index].children[0].clientHeight + "px";
        if (isElse) {
          //有一个已经打开 打开了另一个
          this.list[hasClickIndex].isExpand = false;
          contentList[hasClickIndex].style.height = "0px";
          contentList[hasClickIndex].children[0].style.top =
            -contentList[hasClickIndex].offsetHeight + "px";
          this.$refs.title[hasClickIndex].style.position = "relative";
          contentList[hasClickIndex].style.marginTop = "0px";
          setTimeout(res => {
            contentList[hasClickIndex].children[0].style.top = "0px";
          }, 500);
        } else {
          //第一次打开自己
        }
      } else {
        //关闭自己

        this.list[index].isExpand = false;
        contentList[index].style.height = "0px";
        contentList[index].children[0].style.top =
          -contentList[index].offsetHeight + "px";
        this.$refs.title[index].style.position = "relative";
        contentList[index].style.marginTop = "0px";
        setTimeout(res => {
          contentList[index].children[0].style.top = "0px";
        }, 500);
      }
      setTimeout(() => {
        this.timeout = false;
      }, 500);
    }
  }
};
</script>

<style lang="less">
.cardList {
  .van-icon-question-o {
    color: #dcdcdc;
    vertical-align: -3px;
    margin-left: 5px;
    font-size: 15px;
  }
  .list-item {
    .van-cell {
      display: flex;
      justify-content: flex-start;
      font-size: 16px;
    }
    .textContent {
      text-align: left;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .card-item {
    .card-title {
      font-size: 16px;
      line-height: 0.64rem;
      padding: 0.26667rem 0.4rem;
      color: #323233;
      background-color: #fff;
      border-bottom: 0.02667rem solid #ebedf0;
      display: flex;
      justify-content: space-between;
      // align-items: flex-start;
      top: 0;
      left: 0;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      z-index: 20;
      .van-icon {
        line-height: 0.64rem;
      }
    }
    .card-content {
      color: #969799;
      font-size: 0.34667rem;
      line-height: 1.5;
      background-color: #fff;
      overflow: hidden;
      height: 0;
      padding: 0;
      width: 100%;
      transition: height 0.5s;
      position: relative;
      top: 0px;
      left: 0px;
      // border-bottom: 0.02667rem solid #ebedf0;
      .content {
        padding: 0.2rem 0.3rem;
        font-size: 16px;
        position: absolute;
        top: 0;
        left: 0;
        transition: top 0.5s;
      }
    }
  }
}
</style>
