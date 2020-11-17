//引入核心库
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//调用vuex插件
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'
import goods from './modules/goods'

//导出实例化的仓库
export default new Vuex.Store({
    modules:{
        menu,
role,
user,
cate,
specs,
member,
banner,
seck,
goods
    }
})