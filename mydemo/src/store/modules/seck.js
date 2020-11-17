import {getSeckList} from '../../util/index'

const state={
    seckList:[],
   
  
}

const getters={
    getSeckList(){
        return state.seckList
    },
  
}

const mutations={
    REQ_seckList(state,payload){
        state.seckList=payload
    },
  
}

const actions={
    getSeckAction({commit}) {
     
        //调取列表接口
        getSeckList().then(res => {
          if (res.data.code == 200) {
           
            //提交一个mutations
            commit("REQ_seckList", res.data.list);
          }
        });
      },
    }
export default{
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}