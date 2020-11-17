<template>
  <div>
    <el-table :data="menuList" border
    row-key="id"
      default-expand-all
     :tree-props="{ children: 'children' }" style="width: 100%">
       <el-table-column prop="id"   label="菜单编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180"> </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
         <div>
                 <el-tag v-if="scope.row.status==1" type="success">启用</el-tag>   
                 <el-tag v-else type="danger">禁用</el-tag>   
              </div>
      </template>
         </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
         <div>
                    <el-button type="primary" size='small' @click="edit(scope.row.id)"  >编辑</el-button>
                    <el-button type="danger" size='small'  @click="deleteRow(scope.row.id)">删除</el-button>
              </div>
      </template>
    </el-table-column>
    </el-table>

   
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { getMenuDelete } from '../../util';

export default {
  data() {
    return {
     
    };
     },
    computed: {
        ...mapGetters({
            menuList:'menu/getMenuList'
        })
    },
   
    mounted(){
        this.getMenuList()
    },
    methods:{
        ...mapActions({
            getMenuList:'menu/getMenuListAction',
        }),

        // 删除
         deleteRow(a) {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              getMenuDelete({id:a})
           .then(res=>{
             if (res.data.code == 200) {
              this.$message.success(res.data.msg); 
              this.getMenuList();
            }
             
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });



         
      },

      // 编辑 
      edit(id){
     this.$emit('edit',id)
      }

    }
 
};
</script>

<style lang="stylus" scoped></style>