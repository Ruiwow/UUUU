<template>
    <div>
        <el-bread></el-bread>
         <!-- <el-button @click="isAdd"   type="primary" plain size="small">添加</el-button> -->

<el-list @edit="edit"></el-list>
<el-add :isInfo='isInfo' ref='pop' @cancel='cancel'></el-add>
    </div>
</template>

<script>

import elBread from '../../components/el-bread'
import elList from './list'
import elAdd from './add'
    export default {
    data() {
        return {
         isInfo:{
            isAdd:true,
            isShow:false,
           
            }
            
        }
    },
  
        components:{
            elBread,
            elList,
            elAdd
           
        },
        methods:{
             isAdd(e){
                 this.isInfo.isShow=true
                 this.isInfo.isAdd=true

            },
              cancel(e){
               
                this.isInfo.isShow=e
            },
            // 这里接受从list 传过来的id
            edit(e){
                //控制弹窗，以及弹窗显示内容
                
                this.isInfo.isShow=true
                this.isInfo.isAdd=false
                // 利用ref获取add页面上的方法
                this.$refs.pop.getOne(e)
            }
     
    }
    }
</script>

<style lang="stylus" scoped>

</style>