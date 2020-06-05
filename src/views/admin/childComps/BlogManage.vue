<!--  -->
<template>
  <div class="blog-manage-box">
    <table>
      <tr>
        <th>标题</th>
        <th>阅读量</th>
        <th>点赞数</th>
        <th>类型</th>
        <th>发布时间</th>
        <th colspan="2"></th>
      </tr>

      <tr v-for="item in blogList">
        <td class="title">{{item.title}}</td>
        <td>{{item.read_num}}</td>
        <td>{{item.liked_num}}</td>
        <td>{{item.blog_type}}</td>

        <td>{{item.save_time}}</td>
        <td>
          <div class="btn" @click="preview(item)">预览</div>
        </td>
        <td>
          <div class="btn" @click="del(item.id)">删除</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "BlogManage",
  data() {
    return {
      blogList: []
    };
  },
  components: {},
  methods: {
    getBlogList() {
      this.$http
        .get("/api/getBlogList", {})
        .then(res => {
          console.log("res", res);
          this.blogList = res.data;
          console.log(this.blogList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    preview(item) {
      this.$router.push({ path: "/blogdetail", query: { id: item.id } });
    },
    del(id) {
      this.$http
        .post("/api/deleteRecord", { thedatabase: "blog_md", id: id })
        .then(res => {
          console.log(res);
          this.getBlogList();
        });
        //重新获取数据

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getBlogList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.blog-manage-box {
  display: flex;
}
table {
  width: 100%;

  text-align: center;
}
th {
  color: #fff;
  height: 4rem;
  background-color: var(--color-tint);
}
.title {
  width: 50%;
  height: 4rem;
  text-align: justify;
  word-break: break-all;
}
td {
  background-color: rgb(250, 250, 250);
}
th,
td {
  padding: 0.5rem 1rem;
}

.btn {
  font-size: 0.875em;
  padding: 0.3rem 0.5rem;
  background-color: #fff;
  border: 0.1rem solid var(--color-tint);
}
.btn:hover {
  cursor: pointer;
  color: #fff;
  background-color: var(--color-tint);
}
</style>