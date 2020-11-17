<template>
  <div>
    <el-table :data="goodsList" border
    style="width: 100%">
       <el-table-column prop="id"   label="商品编号" width="120"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120"> </el-table-column>
       <el-table-column prop="price" label="商品价格" width="120"> </el-table-column>
       <el-table-column prop="market_price" label="市场价格" width="120"> </el-table-column>
       
      <el-table-column  label="图片">
        <template slot-scope="scope">
          <div>
            <img v-if="scope.row.img==''" src="" alt="">
            <img class="img" v-else :src="$Url+scope.row.img" alt="">
          </div>
        </template> </el-table-column>

          <el-table-column prop="isnew" label="是否新品" width="120"> </el-table-column>
       <el-table-column prop="ishot" label="是否热卖" width="120"> </el-table-column>
       
     
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
                    <el-button type="danger" size='small'  @click="del(scope.row.id)">删除</el-button>
              </div>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total='goodsCount'
  :page-size='goodsSize'
  @current-change='getPage'
  @prev-click='prev'
  @next-click='next'
  >
</el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {  getGoodsDelete } from "../../util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount:"goods/getGoodsCount",
      goodsSize:'goods/getGoodsSize'
    }),
  },

  mounted() {
    this.getGoodsAct();
    this.getGoodsCount()
  },
  methods: {
    ...mapActions({
      getGoodsAct: "goods/getGoodsAction",
      getGoodsCount:'goods/getCountAction',
      changePage:'goods/changePageAction'
    }),

    // 删除
    del(id) {

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
           
              this.$message.success(res.data.msg);
           
             this.getGoodsCount()
             
               this.getGoodsAct();
               let page;
               if(Math.ceil((this.specsCount)/(this.specsSize))-1==0){
                 page=1
               }
               else{
page=Math.ceil((this.goodsCount)/(this.goodsSize))-1
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

<style lang="stylus" scoped>


.img{
  width 150px
}
</style>