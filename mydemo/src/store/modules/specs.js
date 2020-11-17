import {getSpecsList,getSpecsCount} from '../../util/index'

const state={
    specsList:[],
    specsListAll:[],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
  
}

const getters={
    getSpecsList(){
        return state.specsList
    },
    getSpecsListAll(){
      return state.specsListAll
    },
     //导出总条数
  getSpecsCount() {
    return state.total;
  },
  //导出总条数
  getSpecsSize() {
    return state.size;
  }
}

const mutations={
    REQ_specsList(state,payload){
        state.specsList=payload
    },
    REQ_specsListAll(state,payload){
      state.specsListAll=payload
  },
     //修改state中的total总条数
  REQ_SPECSCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state,payload){
    state.page = payload
  }
}

const actions={
    getSpecsAction(context) {
     
        //调取列表接口
        getSpecsList({
          size: context.state.size,
          page: context.state.page
        }).then(res => {
          if (res.data.code == 200) {
           
            //提交一个mutations
            context.commit("REQ_specsList", res.data.list);
          }
        });
      },
      getSpecsActionAll(context) {
     
        //调取列表接口
        getSpecsList().then(res => {
          if (res.data.code == 200) {
           
            //提交一个mutations
            context.commit("REQ_specsListAll", res.data.list);
          }
        });
      },

      
      //封装一个获取总条数事件
  getCountAction({ commit }) {
    getSpecsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_SPECSCOUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page的action
  changePageAction(context,payload){
   
    context.commit('REQ_PAGE',payload)
    //重新调取列表
    context.dispatch('getSpecsAction')
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