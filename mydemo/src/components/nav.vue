<template>
  <div>
    <el-menu
      :default-active=" defaultactive"
      class="el-menu-vertical-demo"
      background-color="#585858"
      text-color="#fff"
      active-text-color="#FF8000"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-grid"></i>
        <span>首页</span>
      </el-menu-item>

      <el-submenu v-for="item in menus" :key="item.id" :index="item.id.toString()">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>

        <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">{{menu.title}}</el-menu-item>
        
      </el-submenu>
   
    </el-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultactive: "/home",
     
    };
  },
  mounted(){
    this.defaultactive=this.$route.path
   

   this.$store.commit('menu/M',  JSON.parse( sessionStorage.getItem('userInfo')).menus)
  },
  computed: {
    ...mapGetters({
      menuList:'menu/getMenuList',
      menus:'menu/getM'
    })
  },
  methods: {
   
  },
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 90vh;
}
</style>