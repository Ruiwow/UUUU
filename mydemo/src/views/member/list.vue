<template>
  <div>
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column prop="uid" label="会员编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180">
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
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  getMemberInfo,getMemberEdit } from "../../util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },

  mounted() {
    this.getMemberAct();
  
  },
  methods: {
    ...mapActions({
      getMemberAct: "member/getMemberAction",
    
    }),


    // 编辑
    edit(uid) {
        console.log(uid);
        // 将id传给父级 specs
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