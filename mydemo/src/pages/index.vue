<template>
  <div>
    <el-container>
      <el-header>后台管理系统
{{user}}
       <el-button @click="logout"  type="danger">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="220px">
       
         <v-nav></v-nav>
         
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from '../components/nav'
export default {
 components:{
     vNav
 },
 methods:{
   logout(){
     sessionStorage.removeItem('userInfo');
     this.$router.push('/login')
   }
 },
 computed:{
   user(){
    return JSON.parse( sessionStorage.getItem('userInfo')).username
    
   }
 }
};
</script>

<style lang="stylus" scoped>
.el-header
 background #ccc
 text-align center
 line-height 60px
</style>