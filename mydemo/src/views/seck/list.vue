<template>
  <div>
    <el-table :data="seckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
     
      <el-table-column label="状态" width="180">
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
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  getSeckDelete } from "../../util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckList: "seck/getSeckList",
    
    }),
  },

  mounted() {
    this.getSeckAct();
   
  },
  methods: {
    ...mapActions({
      getSeckAct: "seck/getSeckAction",
  
    }),

    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getSeckDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
           
             
               this.getSeckAct();
              

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
        // 将id传给父级 user
      this.$emit("edit", id);
    },

  }
};
</script>

<style lang="stylus" scoped></style>