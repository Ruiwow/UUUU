import {getGoodsCount,getGoodsList} from '../../util/index'

const state={
    goodsList:[],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0,//总条数
   
  
}

const getters={
    getGoodsList(){
        return state.goodsList
    },
     //导出总条数
  getGoodsCount() {
    return state.total;
  },
  //导出总条数
  getGoodsSize() {
    return state.size;
  }
}

const mutations={
    REQ_goodsList(state,payload){
        state.goodsList=payload
    },
     //修改state中的total总条数
  REQ_GoodsCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state,payload){
    state.page = payload
  }
}

const actions={
    getGoodsAction(context) {
     
        //调取列表接口
        getGoodsList({
          size: context.state.size,
          page: context.state.page,

        }).then(res => {
          console.log(res.data.list);
          if (res.data.code == 200) {
            //提交一个mutations
            context.commit("REQ_goodsList", res.data.list);
          }
        });
      },
      //封装一个获取总条数事件
  getCountAction({ commit }) {
    getGoodsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_GoodsCOUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page的action
  changePageAction(context,payload){
   
    context.commit('REQ_PAGE',payload)
    //重新调取列表
    context.dispatch('getGoodsAction')
  }
}

export default{
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}