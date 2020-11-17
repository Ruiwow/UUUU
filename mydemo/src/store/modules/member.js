import {getMemberList} from '../../util/index'

const state={
    memberList:[],
 
    
  
}

const getters={
    getMemberList(){
        return state.memberList
    },
    
}

const mutations={
    REQ_memberList(state,payload){
        state.memberList=payload
    },
    
 
}

const actions={
    getMemberAction({commit}) {
     
        //调取列表接口
        getMemberList().then(res => {
          if (res.data.code == 200) {
            //提交一个mutations
            commit("REQ_memberList", res.data.list);
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