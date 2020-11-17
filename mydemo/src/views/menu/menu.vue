<template>
    <div>
        <el-bread></el-bread>
         <el-button @click="isAdd"  type="primary" plain size="small">添加</el-button>
<el-list @edit="edit"  ></el-list>
<el-add @cancel='cancel' ref="pop" :isInfo='isInfo' ></el-add>

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
            edit(e){
                
                this.isInfo.isShow=true
                this.isInfo.isAdd=false

this.$refs.pop.getOne(e)
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>