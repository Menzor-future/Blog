<!--  -->
<template>
  <div class="photo-manage-box">
    <table>
      <tr>
        <th>标题</th>
        <th>阅读量</th>
        <th>点赞数</th>

        <th>发布时间</th>
        <th colspan="2"></th>
      </tr>

      <tr v-for="(item,index) in photoList">
        <td class="title">{{item.title}}</td>
        <td>{{item.read_num}}</td>
        <td>{{item.liked_num}}</td>
        <td>{{item.save_time}}</td>
        <td>
          <div class="btn" @click="preview(index)">预览</div>
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
  name: "PhotoManage",
  data() {
    return {
      photoList: []
    };
  },
  components: {},
  methods: {
    getPhotoInfo() {
      this.$http.get("/api/getPhotoInfo").then(res => {
        console.log(res);
        this.photoList = res.data;
      });
    },
    preview(index) {
      this.$router.push({ path: "/photoshow", query: { itemindex: index } });
    },
    del(id) {
      this.$http
        .post("/api/deleteRecord", { thedatabase: "photo_info", id: id })
        .then(res => {
          console.log(res);
        });
      this.getPhotoInfo();
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getPhotoInfo();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.photo-manage-box {
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