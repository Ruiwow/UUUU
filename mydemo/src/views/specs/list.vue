<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
        <el-table-column prop="rolename" label="规格属性" width="180">
          <template slot-scope="scope">
            <div>
              <el-tag v-for='item in scope.row.attrs' :key="item">{{item}}</el-tag>
            </div>
          </template>
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
            <el-button type="primary" size="small" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total='specsCount'
  :page-size='specsSize'
  @current-change='getPage'
  @prev-click='prev'
  @next-click='next'
  >
</el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  getSpecsDelete } from "../../util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount:"specs/getSpecsCount",
      specsSize:'specs/getSpecsSize'
    }),
  },

  mounted() {
    this.getspecsAct();
    this.getspecsCount()
  },
  methods: {
    ...mapActions({
      getspecsAct: "specs/getSpecsAction",
      getspecsCount:'specs/getCountAction',
      changePage:'specs/changePageAction'
    }),

    // 删除
    del(id) {

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
           
              this.$message.success(res.data.msg);
           
             this.getspecsCount()
             
               this.getspecsAct();
               let page;
               if(Math.ceil((this.specsCount)/(this.specsSize))-1==0){
                 page=1
               }
               else{
page=Math.ceil((this.specsCount)/(this.specsSize))-1
               }
               this.changePage(page);
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
    edit(id) {
        console.log(id);
        // 将id传给父级 specs
      this.$emit("edit", id);
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