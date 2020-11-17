<template>
  <div>
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="180">
      </el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" size="small" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(scope.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total='userCount'
  :page-size='userSize'
  @current-change='getPage'
  @prev-click='prev'
  @next-click='next'
  >
</el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  getUserDelete } from "../../util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount:"user/getUserCount",
      userSize:'user/getUserSize'
    }),
  },

  mounted() {
    this.getUserAct();
    this.getUserCount()
  },
  methods: {
    ...mapActions({
      getUserAct: "user/getUserAction",
      getUserCount:'user/getCountAction',
      changePage:'user/changePageAction'
    }),

    // 删除
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);   
               this.getUserCount()
              
                 let page;
                 
               if(Math.ceil((this.userCount)/(this.userSize))-1==0){
                 page=1
               }
               else{
page=Math.ceil((this.userCount)/(this.userSize))-1
               }
               this.changePage(page);
               
             this.getUserAct();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 编辑
    edit(uid) {
        console.log(uid);
        // 将id传给父级 user
      this.$emit("edit", uid);
    },


    getPage(e){
this.changePage(e);
    },
    prev(e){
     this.changePage(e)
    },
    next(e){
       this.changePage(e)
    }
  },
};
</script>

<style lang="stylus" scoped></style>