<template>
  <div>
    <el-table :data="bannerList" border
   
     
    style="width: 100%">
       <el-table-column prop="id"   label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180"> </el-table-column>
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <div>
            <img v-if="scope.row.img==''" src="" alt="">
            <img class="img" v-else :src="$Url+scope.row.img" alt="">
          </div>
        </template> </el-table-column>
     
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
import { getBannerDelete } from '../../util';

export default {
  data() {
    return {
     
    };
     },
    computed: {
        ...mapGetters({
            bannerList:'banner/getBannerList'
        })
    },
   
    mounted(){
        this.getBannerList()
    },
    methods:{
        ...mapActions({
            getBannerList:'banner/getBannerListAct',
        }),

        // 删除
         deleteRow(a) {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              getBannerDelete({id:a})
           .then(res=>{
             if (res.data.code == 200) {
              this.$message.success(res.data.msg); 
              this.getBannerList();
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

<style lang="stylus" scoped>
.img
  width 150px
</style>